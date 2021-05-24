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
    console.log(text);
    this.textInput = text;
    this.textOut = text;
    console.log(this.textOut);
  }

  getText() {
    console.log('getText called');
    return this.textOut;
  }
}
