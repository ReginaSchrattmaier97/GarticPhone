import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  timeLimit = 30;
  timePassed = 0;
  timeLeft = this.timeLimit;
  timerInterval = null;
  seconds: number;

  constructor() {}

  ngOnInit(): void {}

  formatTimeLeft(time) {
    this.seconds = time % 60;
    let secondsLeadingZero;
    if (this.seconds < 10) {
      secondsLeadingZero = `0${this.seconds}`;
    } else if (this.seconds == 0) {
      this.stopTimer();
    } else {
      secondsLeadingZero = this.seconds;
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
}
