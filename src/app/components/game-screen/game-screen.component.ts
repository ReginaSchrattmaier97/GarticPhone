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

  ref: ComponentRef<any>;

  //controll variables
  roundNumber = 6;
  roundCounter = 1;
  isDrawingRound = false;
  isTextRound = true;
  firstRound = true;
  timeLimit = 10;
  timePassed = 0;
  timeLeft = this.timeLimit;
  timerInterval = null;

  seconds: number;

  //init
  initRound: TextRound;
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
    private el: ElementRef
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

  getRandomText(
    roundCounter: number,
    gamecode: string,
    nextUserId: string
  ): Promise<String> {
    const itemRef = this.dbService.db
      .list(
        '/games/' +
          gamecode +
          '/rounds/' +
          roundCounter +
          '/textRounds/' +
          nextUserId
      )
      .snapshotChanges()
      .forEach((textSnapshot) => {
        this.textList = [];
        textSnapshot.forEach((textSnapshot) => {
          let text = textSnapshot.payload.toJSON();
          console.log('text');
          console.log(text);
          this.textList.push(text);
        });
        console.log('this.textList');
        console.log(this.textList);
      });

    return this.textList;

    //const texts = await this.dbService.getTextsofRound(gamecode, roundCounter);
  }

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

  createDrawingRound() {
    this.currentUserId = localStorage.getItem('currentUserId');
    //create Round
    this.currentDrawingRound = new DrawingRound(
      this.currentUserId,
      this.dataFromDrawingEditor
    );

    return this.currentDrawingRound;
  }

  createTextRound(dataFromTextInput) {
    this.currentUserId = localStorage.getItem('currentUserId');
    //create Round
    this.currentTextRound = new TextRound(
      this.currentUserId,
      dataFromTextInput,
      ''
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

  formatTimeLeft(time) {
    this.seconds = time % 60;
    let secondsLeadingZero;
    if (this.seconds < 10) {
      secondsLeadingZero = `0${this.seconds}`;
    } else if (this.seconds == 0) {
      this.stopTimer();
    }
    return `00:${secondsLeadingZero}`;
  }

  startTimer() {
    this.formatTimeLeft(this.timeLeft);
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.timeLimit - this.timePassed;
      document.getElementById('base-timer-label').innerHTML =
        this.formatTimeLeft(this.timeLeft);
      this.setCircleDasharray();
      if (this.timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  stopTimer() {
    setTimeout(() => {
      this.timeLeft = this.timeLimit;
      this.timerInterval = null;
      this.timePassed = 0;
      this.seconds = 0;
    }, 1000);
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  calculateTimeFraction() {
    return this.timeLeft / this.timeLimit;
  }

  setCircleDasharray() {
    const circleDasharray = `${(this.calculateTimeFraction() * 283).toFixed(
      0
    )} 283`;
    document
      .getElementById('base-timer-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray);
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

      //get random text
      // let nextUserId = this.getNextUserId(this.gamecode, this.currentUserId);
      // console.log('next user id: ' + nextUserId);
      let prevText = await this.getRandomText(
        this.roundCounter - 1,
        this.gamecode,
        this.currentUserId
      );
      console.log('2. got prev text');
      console.log(prevText);

      //create Round
      this.createDrawingRound();
      console.log('3. create drawing round');

      //set Text of previouse Round for view
      if (!prevText) {
        this.currentDrawingRound.data = 'no input of user happened :(';
      } else {
        this.currentDrawingRound.data = prevText.toString();
      }
      console.log('4. set prev text');

      console.log('isTextRound: ' + this.isTextRound);
      console.log('isDrawingRound: ' + this.isDrawingRound);

      if (this.isDrawingRound) {
        this.loadDrawComponent();
        console.log('loaded Drawing Screen');
      }

      // user is drawing
      this.startTimer();
      setTimeout(() => {
        //finished drawing
        console.log('5. drawing...');

        this.dataFromDrawingEditor =
          this.drawingInputRef.instance.drawingDataFromChild;

        console.log(this.drawingInputRef.instance.drawingDataFromChild);

        //TODO push on author array------------------>

        //this.rounds.push(this.currentDrawingRound);
        this.dbService.saveImagesToRound(
          this.gamecode,
          this.roundCounter,
          this.dataFromDrawingEditor,
          this.currentUserId
        );

        //this.images.push(this.dataFromDrawingEditor);

        //++this.roundCounter;
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
          //this.getAllTexts(this.gamecode);
          let myTag;
          myTag = this.el.nativeElement.querySelector('li');
          myTag.classList.remove('hidden');
        }
        this.stopTimer();
      }, 10000);
    }

    //Text Round --------------------------------
    else {
      // if not first round get previos round data
      if (this.roundCounter != 1) {
        console.log('not in first round');
        this.firstRound = false;
        this.currentTextRound.data = this.previouseRound.data;
      }
      this.isTextRound = true;
      this.isDrawingRound = false;
      console.log('in first Round');
      console.log('isTextRound: ' + this.isTextRound);
      console.log('isDrawingRound: ' + this.isDrawingRound);

      if (this.isTextRound) {
        //this.detachView(TextInputComponent);
        console.log(' in this.loadComponent');
        this.loadTextComponent();
        console.log(' loades componend');
      }
      this.startTimer();
      setTimeout(() => {
        this.dataFromTextInput = this.textInputRef.instance.textInput;
        if (this.dataFromTextInput == null) {
          this.dataFromTextInput = 'Draw anything you like';
        }

        //this.rounds.push(textRound);

        //TODO push on author array------------------>
        //save text in db for random function
        let textRound = this.createTextRound(this.dataFromTextInput);
        this.dbService.saveTextsToRound(
          this.gamecode,
          this.roundCounter,
          textRound,
          this.currentUserId
        );

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
        this.stopTimer();
      }, 10000);
    }
  }
}
