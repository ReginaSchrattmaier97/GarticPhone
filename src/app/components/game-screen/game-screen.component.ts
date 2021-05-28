import { Component, EventEmitter, OnInit } from '@angular/core';
import { Round } from 'src/app/shared/types/Round';
import { DrawingRound } from 'src/app/shared/types/drawingRound';
import { TextRound } from 'src/app/shared/types/textRound';
import {
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { DrawingEditorComponent } from 'src/app/components/drawing-editor/drawing-editor.component';
import { TextInputComponent } from 'src/app/components/text-input/text-input.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ActivatedRoute } from '@angular/router';
import { Output } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  DrawingRoundState,
  StartFirstRound,
  TextRoundState,
} from 'src/app/store/game/game.actions';
import { Store } from '@ngxs/store';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
})
export class GameScreenComponent implements OnInit, AfterViewInit {
  @ViewChild(DrawingEditorComponent) drawingEditor: DrawingEditorComponent;
  @ViewChild(TextInputComponent) textInput: TextInputComponent;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  @ViewChild('containerDraw', { read: ViewContainerRef })
  containerDraw: ViewContainerRef;
  @ViewChild('containerTimer', { read: ViewContainerRef })
  containerTimer: ViewContainerRef;
  @Output() roundChanged = new EventEmitter<any>();

  //Data from Input
  dataFromDrawingEditor: any;
  dataFromTextInput: any;

  textList: Array<string>;
  resultList: Array<string>;
  userList: any;
  previousData: string;
  resultOfGarticGame: any;
  finalResults: Array<Array<string>> = [];
  authorID: string;

  ref: ComponentRef<any>;
  refTimer: ComponentRef<TimerComponent>;

  //controll variables
  roundNumber: number = 6;
  roundCounter: number = 1;
  isDrawingRound: boolean = false;
  isTextRound: boolean = true;
  firstRound: boolean = true;
  isFinished: boolean = false;

  //init
  previouseRound: Round;
  currentDrawingRound: DrawingRound;
  currentTextRound: TextRound;

  textInputRef: any;
  drawingInputRef: any;
  timerInputRef: any;
  currentUserId: any;
  gamecode: string;

  public rounds: Round[] = []; //Array with Rounds

  constructor(
    private authService: AuthenticationService,
    private dbService: DatabaseService,
    private router: ActivatedRoute,
    private commonRouter: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    //set game ID
    this.gamecode = this.router.snapshot.params.id;
    this.userList = this.getAllUserId(this.gamecode);
  }

  ngAfterViewInit(): void {
    //game
    this.gameLogic();
  }

  async gameLogic() {
    //drawing Round----------------------

    if (this.roundCounter % 2 == 0) {
      //update variables for view
      this.isTextRound = false;
      this.isDrawingRound = true;

      //roundChanged
      this.roundChanged.emit();

      let index = 0;
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i] == this.previouseRound.authorId) {
          if (i + 1 == this.userList.length) {
            index = 0;
          } else {
            index = i + 1;
          }
          break;
        }
      }

      await this.getPreviousText(
        this.gamecode,
        this.userList[index],
        this.roundCounter - 1
      );
      let prevText = this.previousData;
      //create Round
      this.createDrawingRound(
        this.dataFromDrawingEditor,
        this.userList[index],
        prevText
      );

      this.store.dispatch(new DrawingRoundState(prevText));

      if (this.isDrawingRound) {
        this.loadDrawComponent();
        this.loadTimerComponent();
      }

      // user is drawing
      this.timerInputRef.instance.startTimer();
      setTimeout(async () => {
        //finished drawing
        this.dataFromDrawingEditor =
          this.drawingInputRef.instance.drawingDataFromChild;

        this.currentDrawingRound.img = this.dataFromDrawingEditor;
        this.dbService.saveImagesToRound(
          this.gamecode,
          this.currentDrawingRound.authorId,
          this.currentDrawingRound,
          this.roundCounter.toString()
        );
        await this.delay(1000);

        this.previouseRound = this.currentDrawingRound;

        //update variables for view
        this.isTextRound = false;
        this.isDrawingRound = true;
        ++this.roundCounter;

        if (this.roundCounter <= this.roundNumber) {
          this.gameLogic();
        }
        if (this.roundCounter == 7) {
          this.ref.destroy();
          this.refTimer.destroy();
          for (let i = 0; i < this.userList.length; i++) {
            await this.getAllResults(this.gamecode, this.userList[i]);
            this.finalResults[i] = [];
            for (let j = 1; j < this.resultOfGarticGame.length; j++) {
              if (j % 2 == 1) {
                this.finalResults[i][j - 1] = this.resultOfGarticGame[j].text;
              } else {
                this.finalResults[i][j - 1] = this.resultOfGarticGame[j].img;
              }
            }
          }
          this.isFinished = true;
        }
      }, 32000);
    }

    //Text Round --------------------------------
    else {
      // if not first round get previos round data
      let index = 0;
      let prevImg;
      if (this.roundCounter != 1) {
        this.firstRound = false;

        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i] == this.previouseRound.authorId) {
            if (i + 1 == this.userList.length) {
              index = 0;
            } else {
              index = i + 1;
            }
            break;
          }
        }

        await this.getPreviousImg(
          this.gamecode,
          this.userList[index],
          this.roundCounter - 1
        );
        prevImg = this.previousData;
        this.store.dispatch(new TextRoundState(this.currentTextRound.data));
      }

      this.isTextRound = true;
      this.isDrawingRound = false;

      if (this.isTextRound) {
        this.loadTextComponent();
        this.loadTimerComponent();
      }
      this.timerInputRef.instance.startTimer();
      setTimeout(async () => {
        this.dataFromTextInput = this.textInputRef.instance.textInput;
        if (this.dataFromTextInput == null) {
        }
        if (this.roundCounter == 1) {
          await this.currentUserId.then(async (result) => {
            this.authorID = result.toString();

            this.store.dispatch(new StartFirstRound(this.dataFromTextInput));
            let textRound = this.createTextRound(
              this.dataFromTextInput,
              this.authorID,
              'data'
            );
            this.dbService.saveTextsToRound(
              this.gamecode,
              this.authorID,
              textRound,
              this.roundCounter.toString()
            );
            await this.delay(1000);
          });
        } else {
          let textRound = this.createTextRound(
            this.dataFromTextInput,
            this.userList[index],
            prevImg
          );
          this.dbService.saveTextsToRound(
            this.gamecode,
            this.userList[index],
            textRound,
            this.roundCounter.toString()
          );
          await this.delay(1000);
        }
        this.previouseRound = this.currentTextRound;
        this.isTextRound = true;
        this.isDrawingRound = false;
        ++this.roundCounter;
        if (this.roundCounter <= this.roundNumber) {
          this.gameLogic();
        }
      }, 32000);
    }
  }

  getAllUserId(gamecode: string) {
    this.dbService.db
      .list('/games/' + gamecode + '/users/')
      .valueChanges()
      .subscribe((userData) => {
        this.userList = userData;
      });
  }

  async getAllResults(gamecode: string, authorid: string) {
    await this.dbService.db.database
      .ref('/games/' + gamecode + '/rounds/' + authorid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.resultOfGarticGame = snapshot.val();
        }
      });
  }

  async getPreviousText(gamecode: string, authorid: string, round: number) {
    await this.dbService.db.database
      .ref('/games/' + gamecode + '/rounds/' + authorid + '/' + round + '/text')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.previousData = snapshot.val();
        }
      });
  }

  async getPreviousImg(gamecode: string, authorid: string, round: number) {
    await this.dbService.db.database
      .ref('/games/' + gamecode + '/rounds/' + authorid + '/' + round + '/img')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.previousData = snapshot.val();
        }
      });
  }

  createDrawingRound(dataFromDrawingInput, authorId, data) {
    this.currentUserId = localStorage.getItem('currentUserId');
    //create Round
    this.currentDrawingRound = new DrawingRound(
      authorId,
      this.currentUserId,
      dataFromDrawingInput,
      data
    );

    return this.currentDrawingRound;
  }

  createTextRound(dataFromTextInput, authorId, data) {
    this.currentUserId = localStorage.getItem('currentUserId');
    //create Round
    this.currentTextRound = new TextRound(
      authorId,
      this.currentUserId,
      dataFromTextInput,
      data
    );
    return this.currentTextRound;
  }

  loadTextComponent() {
    if (this.ref) {
      this.ref.destroy();
    }
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(TextInputComponent);
    this.ref = this.container.createComponent(factory);
    this.ref.changeDetectorRef.detectChanges();
    this.textInputRef = this.ref;
  }

  loadDrawComponent() {
    if (this.ref) {
      this.ref.destroy();
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      DrawingEditorComponent
    );
    this.ref = this.containerDraw.createComponent(factory);
    this.ref.changeDetectorRef.detectChanges();
    this.drawingInputRef = this.ref;
  }

  loadTimerComponent() {
    if (this.refTimer) {
      this.refTimer.destroy();
    }
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(TimerComponent);
    this.refTimer = this.containerTimer.createComponent(factory);
    this.refTimer.changeDetectorRef.detectChanges();
    this.timerInputRef = this.refTimer;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  deleteGame() {
    this.dbService.deleteGameFromDB(this.gamecode);
    this.commonRouter.navigate(['/home']);
  }
}
