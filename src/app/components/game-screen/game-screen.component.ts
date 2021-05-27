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
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { GameHostDirective } from 'src/app/directives/game-host.directive';
import { ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { DrawingRoundState, StartFirstRound, TextRoundState } from 'src/app/store/game/game.actions';
import { Store } from '@ngxs/store'


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

  //@ViewChild(GameHostDirective, {static: true}) appGameHost!: GameHostDirective;

  @Output() roundChanged = new EventEmitter<any>();

  //Data from Input
  dataFromDrawingEditor: any;
  dataFromTextInput: any;

  textList;
  resultList;
  userList;

  authorID:string;

  ref: ComponentRef<any>;

  //controll variables
  roundNumber = 6;
  roundCounter = 1;
  isDrawingRound = false;
  isTextRound = true;
  firstRound = true;

  //init
  //initRound: TextRound;
  previouseRound: Round;
  currentDrawingRound: DrawingRound;
  currentTextRound: TextRound;

  textInputRef: any;
  drawingInputRef: any;
  currentUserId;
  gamecode: string;

  //for get Random text or image to pass to another user
  // images: Array<string>;
  // textinputs: Array<string>;

  public rounds: Round[] = []; //Array with Rounds


  constructor(
    private authService: AuthenticationService,
    private dbService: DatabaseService,
    private router: ActivatedRoute,
    private router2: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private el: ElementRef,
    private store:Store,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    //set game ID
    this.gamecode = this.router.snapshot.params.id;
  }

  ngAfterViewInit(): void {
    //init round
    // if(this.roundCounter == 0){
    //   this.initRound.text = this.dataFromTextInput;
    //   this.initRound.userId = this.currentUserId;
    // }

    //game

    this.gameLogic();
  }

  getNextUserId(gamecode: string, userId: string) {
    const itemRef = this.dbService.db
      .list('/games/' + gamecode + '/users/')
      .snapshotChanges()
      .forEach((userSnapshot) => {
        this.userList = [];
        userSnapshot.forEach((userSnapshot) => {
          let user = userSnapshot.payload.toJSON();
          console.log('user');
          console.log(user);
          this.userList.push(user);
        });
        console.log('this.userList');
        console.log(this.userList);
        let index = 0;
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i] == userId) {
            if (i + 1 == this.userList.length) {
              index = 0;
            } else {
              index = i + 1;
            }
          }
        }
        return this.userList[index];
      });
  }

  // getRandomText(
  //   roundCounter: number,
  //   gamecode: string,
  //   nextUserId: string
  // ): Promise<String> {
  //   const itemRef = this.dbService.db
  //     .list(
  //       '/games/' +
  //         gamecode +
  //         '/rounds/' +
  //         roundCounter +
  //         '/textRounds/' +
  //         nextUserId
  //     )
  //     .snapshotChanges()
  //     .forEach((textSnapshot) => {
  //       this.textList = [];
  //       textSnapshot.forEach((textSnapshot) => {
  //         let text = textSnapshot.payload.toJSON();
  //         console.log('text');
  //         console.log(text);
  //         this.textList.push(text);
  //       });
  //       console.log('this.textList');
  //       console.log(this.textList);
  //     });

  //   return this.textList;

  //   //const texts = await this.dbService.getTextsofRound(gamecode, roundCounter);
  // }

  getAllResults(gamecode: string) {
    const itemRef = this.dbService.db
      .list('/games/' + gamecode)
      .snapshotChanges()
      .forEach((resultSnapshot) => {
        this.resultList = [];
        resultSnapshot.forEach((resultSnapshot) => {
          let result = resultSnapshot.payload.toJSON();
          this.resultList.push(result);
        });
        console.log('this.resultList');
        console.log(this.resultList);
      });
  }

  getAllTexts(gamecode: string) {
    const itemRef = this.dbService.db
      .list('/games/' + gamecode + '/rounds/' + '/textRounds/')
      .snapshotChanges()
      .forEach((resultSnapshot) => {
        this.resultList = [];
        resultSnapshot.forEach((resultSnapshot) => {
          let result = resultSnapshot.payload.toJSON();
          this.resultList.push(result);
        });
        console.log('this.resultList');
        console.log(this.resultList);
      });
  }

  // getRandomArbitrary(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  createDrawingRound(dataFromDrawingInput, authorId, data) {
    this.currentUserId = localStorage.getItem('currentUserId');
    //create Round
    this.currentDrawingRound = new DrawingRound(
      this.currentUserId,
      dataFromDrawingInput,
      data,
      authorId,
    );
    return this.currentDrawingRound;
  }

  createTextRound(dataFromTextInput, authorId, data) {
    this.currentUserId = localStorage.getItem('currentUserId');
    //create Round
    this.currentTextRound = new TextRound(
      this.currentUserId,
      dataFromTextInput,
      data,
      authorId
    );

    console.log('current text round');
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

  async gameLogic() {
    console.log('Round' + this.roundCounter);

    //drawing Round----------------------

    if (this.roundCounter % 2 == 0) {


      //update variables for view
      this.isTextRound = false;
      this.isDrawingRound = true;

      console.log('1. in drawing round');

      //roundChanged
      this.roundChanged.emit();


      let prevText = "prevText";

      console.log('2. got prev text');
      console.log(prevText);

      //create Round
      //this.createDrawingRound(this.dataFromDrawingEditor);
      console.log('3. create drawing round');

      this.store.dispatch(new DrawingRoundState(prevText));

      //set Text of previouse Round for view
      if (!prevText) {
        this.currentDrawingRound.data = 'no input of user happened :(';
      } else {
        console.log("this.currentDrawingRound");
        console.log(this.currentDrawingRound);
        this.currentDrawingRound.data = prevText;
      }
      console.log('4. set prev text');

      console.log('isTextRound: ' + this.isTextRound);
      console.log('isDrawingRound: ' + this.isDrawingRound);

      if (this.isDrawingRound) {
        this.loadDrawComponent();
        console.log('loaded Drawing Screen');
      }

      // user is drawing
      setTimeout(() => {
        //finished drawing
        console.log('5. drawing...');

        this.dataFromDrawingEditor =
          this.drawingInputRef.instance.drawingDataFromChild;

        console.log(this.drawingInputRef.instance.drawingDataFromChild);

        //TODO push on author array------------------>


        let drawingRound = this.createDrawingRound(this.dataFromDrawingEditor,this.previouseRound.authorId,'data');
        this.dbService.saveImagesToRound(
          this.gamecode,
          this.previouseRound.authorId,
          drawingRound,
          this.roundCounter.toString()
        );


        this.previouseRound = this.currentDrawingRound;

        //update variables for view
        this.isTextRound = false;
        this.isDrawingRound = true;
        ++this.roundCounter;

        console.log(this.roundCounter);

        if (this.roundCounter <= this.roundNumber) {
          this.gameLogic();
        }
        if (this.roundCounter == 7) {
          this.ref.destroy();
          console.log('done!!');
          this.getAllResults(this.gamecode);
          let myTag;
          myTag = this.el.nativeElement.querySelector('li');
          myTag.classList.remove('hidden');
        }
      }, 10000);
    }

    //Text Round --------------------------------
    else {

      // if not first round get previos round data
      if (this.roundCounter != 1) {
        console.log('not in first round');
        this.firstRound = false;
        this.currentTextRound.data = this.previouseRound.data;

        this.store.dispatch(new TextRoundState(this.currentTextRound.data));
      }

      this.isTextRound = true;
      this.isDrawingRound = false;

      if (this.isTextRound) {
        this.loadTextComponent();
      }
      setTimeout(() => {
        this.dataFromTextInput = this.textInputRef.instance.textInput;
        if (this.dataFromTextInput == null) {
          this.dataFromTextInput = 'Draw anything you like';
        }

        //TODO push on author array------------------>
        //save text in db for random function


        if(this.roundCounter == 1){
          console.log("in first round");
          this.currentUserId.then((result)=>{

            console.log("then");
            console.log(result);
            this.authorID = result.toString();

            this.store.dispatch(new StartFirstRound(this.dataFromTextInput))

          let textRound = this.createTextRound(this.dataFromTextInput,this.authorID, 'data');
          console.log(textRound);
          this.dbService.saveTextsToRound(
            this.gamecode,
            this.authorID,
            textRound,
            this.roundCounter.toString()
          )
          })
          //this.authorID = localStorage.getItem('currentUserId');

        }
        else{

        let textRound = this.createTextRound(this.dataFromTextInput, this.previouseRound.authorId, 'data');
        console.log(textRound);
        this.dbService.saveTextsToRound(
          this.gamecode,
          this.previouseRound.authorId,
          textRound,
          this.roundCounter.toString()
        );


        }




        console.log("here");




        //this.textinputs.push(this.dataFromTextInput);

        //++this.roundCounter;

        this.previouseRound = this.currentTextRound;
        this.isTextRound = true;
        this.isDrawingRound = false;
        console.log('finish actions after user input');
        console.log('this.roundCounter');
        console.log(this.roundCounter);

        ++this.roundCounter;

        console.log('isTextRound: ' + this.isTextRound);
        console.log('isDrawingRound: ' + this.isDrawingRound);

        console.log(this.roundCounter);

        if (this.roundCounter <= this.roundNumber) {
          this.gameLogic();
        }
      }, 10000);
    }
  }
}
