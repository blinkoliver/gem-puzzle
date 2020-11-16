let startTimer = (minut, second) => {
  let minutes = minut;
  let seconds = second;
  let appendMinutes = document.querySelector(".minutes");
  let appendSeconds = document.querySelector(".seconds");

  setInterval(() => {
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
  }, 1000);
};

export default startTimer;
