import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Output() textOut;
  public textInputFromChild = '';
  public textInput = '';

  constructor() {}

  ngOnInit(): void {}
  setText(text) {
    this.textInput = text;
    this.textOut = text;
  }

  getText() {
    return this.textOut;
  }
}
