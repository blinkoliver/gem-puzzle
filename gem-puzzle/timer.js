import { createHtmlElement } from "./utils.js";

let createTimer = () => {
  let minutes = "00";
  let seconds = "00";
  let appendMinutes = createHtmlElement(
    "span",
    "minutes",
    minutes,
    document.querySelector(".timer")
  );
  createHtmlElement("span", "colon", ":", document.querySelector(".timer"));
  let appendSeconds = createHtmlElement(
    "span",
    "seconds",
    seconds,
    document.querySelector(".timer")
  );
  let Interval;

  document.querySelector(".start").onclick = () => {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 1000);
  };

  document.querySelector(".stop").onclick = () => {
    clearInterval(Interval);
  };

  let startTimer = () => {
    seconds++;
    if (seconds <= 9) {
      appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds >= 10) {
      appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
      minutes++;
      if (minutes <= 9) {
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
      } else {
        appendMinutes.innerHTML = minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
      }
    }
  };
};
export default createTimer;
