import { Component, OnInit } from '@angular/core';
import { Round } from 'src/app/shared/types/Round';
import { DrawingRound } from 'src/app/shared/types/drawingRound'
import { TextRound } from 'src/app/shared/types/textRound';
import { ViewChild, AfterViewInit } from '@angular/core';
import { DrawingEditorComponent } from 'src/app/components/drawing-editor/drawing-editor.component'
import { TextInputComponent } from 'src/app/components/text-input/text-input.component'
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})


export class GameScreenComponent implements OnInit, AfterViewInit {
  @ViewChild(DrawingEditorComponent) drawingEditor: DrawingEditorComponent;
  @ViewChild(TextInputComponent) textInput: TextInputComponent;

  dataFromDrawingEditor: any;
  dataFromTextInput: any;
  roundNumber= 6;
  roundCounter= 0;
  isDrawingRound= false;
  isTextRound= false;
  currentUserId;

  public rounds:Round[]=[]; //Array with Rounds

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();

  }

  ngAfterViewInit():void{
    this.dataFromDrawingEditor = this.drawingEditor.drawingDataFromChild;
    this.dataFromTextInput = this.textInput.textInputFromChild;


    if(this.roundCounter % 2 == 0){
        this.isTextRound = false;
        this.isDrawingRound = true;

        let drawingRound : Round = new DrawingRound( this.currentUserId, this.dataFromDrawingEditor);

        this.rounds.push(drawingRound);
        ++this.roundCounter;
    }

    else{
      this.isTextRound = true;
      this.isDrawingRound = false;

      let textRound : Round = new TextRound( this.currentUserId, this.dataFromTextInput);

      this.rounds.push(textRound);
      ++this.roundCounter;
    }




  }




}
