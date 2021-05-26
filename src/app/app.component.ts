import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gartic-phone';
  @HostListener('window:onbeforeunload', ['$event'])
  clearLocalStorage(event) {
    localStorage.clear();
  }
}
