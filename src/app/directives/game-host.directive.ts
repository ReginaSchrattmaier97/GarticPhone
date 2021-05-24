import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGameHost]'
})
export class GameHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
