import { createHtmlElement } from "./utils.js";

class CreateTimer {
  constructor() {
    this.minutes = "00";
    this.seconds = "00";
    this.appendMinutes = createHtmlElement(
      "span",
      "minutes",
      this.minutes,
      document.querySelector(".timer")
    );
    this.colomn = createHtmlElement(
      "span",
      "colon",
      ":",
      document.querySelector(".timer")
    );
    this.appendSeconds = createHtmlElement(
      "span",
      "seconds",
      this.seconds,
      document.querySelector(".timer")
    );
    this.Interval;
  }

  // document.querySelector(".start").onclick = () => {
  //     clearInterval(Interval);
  //     Interval = setInterval(startTimer, 1000);
  // };

  startTimer() {
    this.seconds++;
    if (this.seconds <= 9) {
      this.appendSeconds.innerHTML = "0" + this.seconds;
    }
    if (this.seconds >= 10) {
      this.appendSeconds.innerHTML = this.seconds;
    }
    if (this.seconds > 59) {
      this.minutes++;
      if (this.minutes <= 9) {
        this.appendMinutes.innerHTML = "0" + this.minutes;
        this.seconds = 0;
        this.appendSeconds.innerHTML = "0" + 0;
      } else {
        this.appendMinutes.innerHTML = this.minutes;
        this.seconds = 0;
        this.appendSeconds.innerHTML = "0" + 0;
      }
    }
  }
}

export default CreateTimer;
