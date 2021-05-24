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
  isTextRound = true;

  //init
  initRound: TextRound;
  previouseRound: Round;
  currentDrawingRound: DrawingRound;
  currentTextRound: TextRound;

  currentUserId;
  gamecode: string;

  //for get Random text or image to pass to another user
  // images: Array<string>;
  // textinputs: Array<string>;

  public rounds: Round[] = []; //Array with Rounds

  constructor(
    private authService: AuthenticationService,
    private dbService: DatabaseService,
    private router: ActivatedRoute
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

  async getRandomText(roundCounter: number, gamecode: string): Promise<String> {
    const texts = await this.dbService.getTextsofRound(gamecode, roundCounter);
    console.log(texts);
    const index = this.getRandomArbitrary(0, texts.length - 1);
    const textRandom = texts[index];
    return textRandom.text;
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

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

  async gameLogic() {
    console.log('Round' + this.roundCounter);

    //drawing Round----------------------

    if (this.roundCounter % 2 == 0) {
      //roundChanged
      this.roundChanged.emit();

      //get random text
      let prevText = await this.getRandomText(
        this.roundCounter - 1,
        this.gamecode
      );
      console.log(prevText);

      //create Round
      this.createDrawingRound();

      //set Text of previouse Round for view
      this.currentDrawingRound.data = prevText.toString();

      // user is drawing
      setTimeout(() => {
        //finished drawing

        this.dataFromDrawingEditor = this.drawingEditor.drawingDataFromChild;

        //TODO push on author array------------------>

        //this.rounds.push(this.currentDrawingRound);
        this.dbService.saveImagesToRound(
          this.gamecode,
          this.roundCounter,
          this.currentDrawingRound
        );

        //this.images.push(this.dataFromDrawingEditor);

        //++this.roundCounter;
        this.previouseRound = this.currentDrawingRound;

        //update variables for view
        this.isTextRound = false;
        this.isDrawingRound = true;

        ++this.roundCounter;

        if (this.roundCounter <= this.roundNumber) {
          this.gameLogic();
        }
      }, 10000);
    }

    //Text Round --------------------------------
    else {
      // if not first round get previos round data
      if (this.roundCounter != 1) {
        console.log('not in first round');
        this.currentTextRound.data = this.previouseRound.data;
      }

      console.log('in first Round');

      setTimeout(() => {
        this.dataFromTextInput = this.textInput.textInput;
        console.log(this.dataFromTextInput);
        //this.rounds.push(textRound);

        //TODO push on author array------------------>
        //save text in db for random function
        let textRound = this.createTextRound(this.dataFromTextInput);
        console.log(textRound);

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

        ++this.roundCounter;

        if (this.roundCounter <= this.roundNumber) {
          this.gameLogic();
        }
      }, 10000);
    }
  }
}
