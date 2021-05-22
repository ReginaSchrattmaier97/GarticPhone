import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  public textInputFromChild = '';
  public textInput='';

  constructor() { }

  ngOnInit(): void {


  }

  setText(text){
    console.log(text);
    this.textInput = text;
  }





}
