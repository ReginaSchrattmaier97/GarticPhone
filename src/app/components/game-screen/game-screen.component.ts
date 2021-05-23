import { Component, EventEmitter, OnInit } from '@angular/core';
import { Round } from 'src/app/shared/types/Round';
import { DrawingRound } from 'src/app/shared/types/drawingRound';
import { TextRound } from 'src/app/shared/types/textRound';
import { ViewChild, AfterViewInit } from '@angular/core';
import { DrawingEditorComponent } from 'src/app/components/drawing-editor/drawing-editor.component';
import { TextInputComponent } from 'src/app/components/text-input/text-input.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ActivatedRoute } from '@angular/router';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
})
export class GameScreenComponent implements OnInit, AfterViewInit {
  @ViewChild(DrawingEditorComponent) drawingEditor: DrawingEditorComponent;
  @ViewChild(TextInputComponent) textInput: TextInputComponent;

  @Output() roundChanged = new EventEmitter<any>();

  //Data from Input
  dataFromDrawingEditor: any;
  dataFromTextInput: any;

  //controll variables
  roundNumber = 6;
  roundCounter = 1;
  isDrawingRound = false;
  isTextRound = false;


  //init
  initRound : TextRound;
  previouseRound : Round;
  currentDrawingRound : DrawingRound;
  currentTextRound : TextRound;

  currentUserId;
  gamecode :string;

  roundsNumber = 4;

  //for get Random text or image to pass to another user
  // images: Array<string>;
  // textinputs: Array<string>;


  public rounds: Round[] = []; //Array with Rounds

  constructor(private authService: AuthenticationService, private dbService: DatabaseService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    //set game ID
    this.gamecode =  this.router.snapshot.params.id;

  }

  ngAfterViewInit(): void {



    //init round
    // if(this.roundCounter == 0){
    //   this.initRound.text = this.dataFromTextInput;
    //   this.initRound.userId = this.currentUserId;
    // }

    //game

    const subject = new BehaviorSubject(this.roundCounter);
    subject.subscribe();


    for (let i = 1; i<this.roundNumber; i++) {

      console.log("Round"+i);

    //drawing Round----------------------

    if (i % 2 == 0) {

      //roundChanged
      this.roundChanged.emit();

      //update variables for view
      this.isTextRound = false;
      this.isDrawingRound = true;

      //get random text
       let prevTextRound = this.getRandomText(this.roundCounter-1, this.gamecode);
       let prevText = prevTextRound.text;
       console.log(prevText);



      //create Round
        this.createDrawingRound();

      //set Text of previouse Round for view
      this.currentDrawingRound.data = prevText;


      // user is drawing
      setTimeout(() => {
       //finished drawing

       this.dataFromDrawingEditor = this.drawingEditor.drawingDataFromChild;

       //TODO push on author array------------------>

      //this.rounds.push(this.currentDrawingRound);
      this.dbService.saveImagesToRound(this.gamecode, this.roundCounter,this.currentDrawingRound);

      //this.images.push(this.dataFromDrawingEditor);

      //++this.roundCounter;
      this.previouseRound = this.currentDrawingRound;
      }, 30000);
    }


    //Text Round --------------------------------
    else {
      this.isTextRound = true;
      this.isDrawingRound = false;


      console.log("in first Round");

      if(this.roundCounter != 1){
        setTimeout(() => {
        this.createTextRound();
        this.currentTextRound.data = this.previouseRound.data;
        },30000);
      }

      setTimeout(() => {

      this.dataFromTextInput = this.textInput.textInputFromChild;
      this.createTextRound();
      //this.rounds.push(textRound);

      //TODO push on author array------------------>
      //save text in db for random function
      this.dbService.saveTextsToRound(this.gamecode, this.roundCounter,this.currentTextRound);


      //this.textinputs.push(this.dataFromTextInput);

      //++this.roundCounter;
      }, 30000)

    }
  }
}



  getRandomText(roundCounter: number, gamecode: string) : TextRound{
    const texts = this.dbService.getTextsofRound(gamecode, roundCounter);
    const index = this.getRandomArbitrary(0,texts.length-1);
    const textRandom = texts[index];
    return textRandom;
  }


  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  async createDrawingRound() {
    const userFirebase = await this.authService.isLoggedIn();
     //create Round
     this.currentDrawingRound = new DrawingRound(
      this.currentUserId = userFirebase.uid,
      this.dataFromDrawingEditor,
    );
  }

  async createTextRound() {
    const userFirebase = await this.authService.isLoggedIn();
     //create Round
     this.currentTextRound = new TextRound(
      this.currentUserId,
      this.dataFromTextInput,
    );
  }
}
