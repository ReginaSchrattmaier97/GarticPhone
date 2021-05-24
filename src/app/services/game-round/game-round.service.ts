import { Injectable } from '@angular/core';
import { DrawingEditorComponent } from 'src/app/components/drawing-editor/drawing-editor.component';
import { TextInputComponent } from 'src/app/components/text-input/text-input.component';

@Injectable({
  providedIn: 'root',
})
// provides and passes data for rounds
export class GameRoundService {
  constructor() {}


  getBoards() {
    return [
     DrawingEditorComponent,
     TextInputComponent,
    ];
  }
}
