import {
  createHtmlElement,
  getCorrectArray,
  getFromLocalStorage,
  setToLocalStorage,
  sortForSave,
  showModal,
  isSolvable,
} from "./utils.js";
import startTimer from "./timer.js";
import createPuzzle from "./puzzle.js";

let game = (size, savedGameArr) => {
  let puzzleSize = "";
  let randomArr = [];
  let moves;
  let audio = new Audio("./assets/move.mp3");
  let isAudio = false;

  if (savedGameArr.length === 1) {
    randomArr = getCorrectArray(size);
    moves = 0;
  } else {
    randomArr = savedGameArr;
    moves = parseInt(getFromLocalStorage("moves"));
  }
  let initBody = () => {
    let header = createHtmlElement("header", "header");
    let main = createHtmlElement("main", "main");
    let footer = createHtmlElement("footer", "footer");
    document.body.append(header, main, footer);
    return { header, footer };
  };
  //RENDER Field
  let initField = () => {
    let puzzles = [];
    let empty = {};
    let field = createHtmlElement("div", "field");
    document.querySelector(".main").append(field);
    document.querySelector(".field").style.width = "70%";
    let fieldWidth = parseInt(
      document.defaultView
        .getComputedStyle(document.querySelector(".field"), null)
        .width.slice(0, -2)
    );
    document.querySelector(".field").style.height = `${fieldWidth}px`;
    puzzleSize = fieldWidth / size;

    //RENDER Puzzles

    for (let i = 0; i <= randomArr.length - 1; i++) {
      let left = i % size;
      let top = (i - left) / size;
      let value = randomArr[i];

      if (value === 0) {
        empty = {
          left: left,
          top: top,
          element: null,
          value: 0,
        };
      }
      const puzzle = createPuzzle(puzzleSize, top, left, value);

      field.appendChild(puzzle);
      puzzles.push({
        left: left,
        top: top,
        element: puzzle,
        value: value,
      });

      //click move puzles
      let movePuzzle = (index) => {
        const puzzle = puzzles[index];
        const leftDiff = Math.abs(empty.left - puzzle.left);
        const topDiff = Math.abs(empty.top - puzzle.top);
        if (leftDiff + topDiff > 1) {
          return;
        }
        puzzle.element.style.transition = "0.2s";
        puzzle.element.style.top = `${empty.top * puzzleSize}px`;
        puzzle.element.style.left = `${empty.left * puzzleSize}px`;

        const emptyLeft = empty.left;
        const emptyTop = empty.top;

        empty.left = puzzle.left;
        empty.top = puzzle.top;

        puzzle.left = emptyLeft;
        puzzle.top = emptyTop;

        //audio
        if (isAudio) {
          audio.play();
        }
        //win

        let puzzlesWithoutEmpty = puzzles.filter((element) => {
          return element.value !== 0;
        });
        let isWin = puzzlesWithoutEmpty.every((element) => {
          return element.value === element.top * size + element.left + 1;
        });

        if (isWin) {
          while (document.querySelector(".modal").firstChild) {
            document
              .querySelector(".modal")
              .removeChild(document.querySelector(".modal").firstChild);
          }
          showModal(
            createHtmlElement(
              "div",
              "modal-content",
              `Ура! Вы решили головоломку за ${
                document.querySelector(".minutes").innerHTML
              }:${
                document.querySelector(".seconds").innerHTML
              } и ${moves} ходов`
            )
          );
        } else {
          moves += 1;
        }

        //save moves, times, puzzles

        setToLocalStorage(
          "minutes",
          document.querySelector(".minutes").innerHTML
        );
        setToLocalStorage(
          "seconds",
          document.querySelector(".seconds").innerHTML
        );

        document.querySelector(".moves").innerHTML = `moves: ${moves}`;
        setToLocalStorage("savedGameArr", sortForSave(puzzles, size, empty));
        setToLocalStorage("moves", moves);
      };

      puzzle.addEventListener("click", () => movePuzzle(i));

      // drag&drop move puzzles
      // let dragMove = (index, event) => {
      //   const puzzle = puzzles[index];
      //   const leftDiff = Math.abs(empty.left - puzzle.left);
      //   const topDiff = Math.abs(empty.top - puzzle.top);
      //   puzzle.element.ondragstart = () => false;

      //   if (leftDiff + topDiff > 1) {
      //     return;
      //   }

      //   puzzle.element.style.position = "absolute";
      //   puzzle.element.style.zIndex = 2;

      //   let moveAt = (pageX, pageY) => {
      //     puzzle.element.style.left = pageX - puzzle.element.offsetWidth + "px";
      //     puzzle.element.style.top = pageY - puzzle.element.offsetHeight + "px";
      //   };
      //   moveAt(event.pageX, event.pageY);

      //   let onMouseMove = (event) => {
      //     moveAt(event.pageX, event.pageY);
      //   };
      //   document.addEventListener("mousemove", onMouseMove);

      //   puzzle.element.onmouseup = () => {
      //     document.removeEventListener("mousemove", onMouseMove);
      //     puzzle.element.onmouseup = null;
      //   };
      // };
      // puzzle.addEventListener("mousedown", (event) => dragMove(i, event));
    }

    document.querySelector(".field").addEventListener(
      "click",
      () => {
        startTimer(
          getFromLocalStorage("minutes"),
          getFromLocalStorage("seconds")
        );
      },
      { once: true }
    );
  };

  let initHelpElements = (size) => {
    //init size selector
    let sizes = [3, 4, 5, 6, 7, 8];
    let selected = sizes.indexOf(parseInt(size));
    let sizeSelectorElement = createHtmlElement(
      "select",
      "size-selector",
      [
        ...sizes.map((element, index) => {
          if (index !== selected) {
            return createHtmlElement(
              "option",
              "option",
              `${element}x${element}`,
              null,
              ["value", `${element}`]
            );
          } else {
            return createHtmlElement(
              "option",
              "option",
              `${element}x${element}`,
              null,
              ["value", `${element}`],
              ["selected", ""]
            );
          }
        }),
      ],
      document.querySelector(".header")
    );
    sizeSelectorElement.addEventListener("change", (event) => {
      setToLocalStorage("size", `${parseInt(event.target.value)}`);
      setToLocalStorage("savedGameArr", " ");
      deleteGame();
      game(getFromLocalStorage("size"), getFromLocalStorage("savedGameArr"));
    });
    //init timer
    if (savedGameArr.length === 1) {
      createHtmlElement(
        "div",
        "timer",
        [
          createHtmlElement(
            "span",
            "minutes",
            "00",
            document.querySelector(".timer")
          ),
          createHtmlElement(
            "span",
            "colon",
            ":",
            document.querySelector(".timer")
          ),
          createHtmlElement(
            "span",
            "seconds",
            "00",
            document.querySelector(".timer")
          ),
        ],
        document.querySelector(".header")
      );
    } else {
      createHtmlElement(
        "div",
        "timer",
        [
          createHtmlElement(
            "span",
            "minutes",
            `${getFromLocalStorage("minutes")}`,
            document.querySelector(".timer")
          ),
          createHtmlElement(
            "span",
            "colon",
            ":",
            document.querySelector(".timer")
          ),
          createHtmlElement(
            "span",
            "seconds",
            `${getFromLocalStorage("seconds")}`,
            document.querySelector(".timer")
          ),
        ],
        document.querySelector(".header")
      );
    }
    //init moves
    createHtmlElement(
      "span",
      "moves",
      `moves: ${moves}`,
      document.querySelector(".header")
    );
    //init new game arrow
    let newGameElement = createHtmlElement(
      "i",
      "fas fa-redo",
      null,
      document.querySelector(".header")
    );
    newGameElement.addEventListener("click", () => {
      deleteGame();
      game(size, " ");
      setToLocalStorage("savedGameArr", " ");
    });
    //init best games element
    let bestGamesElement = createHtmlElement(
      "i",
      "fas fa-table",
      null,
      document.querySelector(".footer")
    );
    bestGamesElement.addEventListener("click", () => {
      while (document.querySelector(".modal").firstChild) {
        document
          .querySelector(".modal")
          .removeChild(document.querySelector(".modal").firstChild);
      }
      showModal(
        createHtmlElement(
          "div",
          "modal-content",
          "Тут должна быть таблица лучших результатов"
        )
      );
      setTimeout(() => {
        document.querySelector(".modal").style.display = "none";
      }, 1500);
    });
    //volume
    let volumeElement = createHtmlElement(
      "i",
      "fas fa-volume-up",
      null,
      document.querySelector(".footer")
    );
    volumeElement.addEventListener("click", () => {
      if (isAudio) {
        isAudio = false;
        document.querySelector(".fa-volume-up").style.color = "lightslategray";
      } else {
        isAudio = true;
        document.querySelector(".fa-volume-up").style.color = "black";
      }
    });
    //auto asseble
    let assembleElement = createHtmlElement(
      "i",
      "fas fa-puzzle-piece",
      null,
      document.querySelector(".footer")
    );
    assembleElement.addEventListener("click", () => {
      while (document.querySelector(".modal").firstChild) {
        document
          .querySelector(".modal")
          .removeChild(document.querySelector(".modal").firstChild);
      }
      showModal(
        createHtmlElement(
          "div",
          "modal-content",
          "Тут должно было быть анимированое завершение игры"
        )
      );
      setTimeout(() => {
        document.querySelector(".modal").style.display = "none";
      }, 1500);
    });
    //save Game
    let saveGameElement = createHtmlElement(
      "i",
      "far fa-save",
      null,
      document.querySelector(".footer")
    );
    saveGameElement.addEventListener("click", () => {
      while (document.querySelector(".modal").firstChild) {
        document
          .querySelector(".modal")
          .removeChild(document.querySelector(".modal").firstChild);
      }
      showModal(
        createHtmlElement(
          "div",
          "modal-content",
          "Игра сохранена, можете перезагружать сколько угодно"
        )
      );
      setTimeout(() => {
        document.querySelector(".modal").style.display = "none";
      }, 1000);
    });

    //init modal
    let modal = createHtmlElement(
      "div",
      "modal",
      null,
      document.querySelector("body")
    );
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };

  let deleteGame = () => {
    document.querySelector(".header").remove();
    document.querySelector(".main").remove();
    document.querySelector(".footer").remove();
    document.querySelector(".modal").remove();
  };
  //add background
  (function () {
    window.addEventListener("resize", resizeThrottler, false);
    var resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
        }, 1000);
      }
    }
    let actualResizeHandler = () => {
      deleteGame();
      game(
        size,
        getFromLocalStorage("savedGameArr")
          .split(",")
          .map((element) => parseInt(element))
      );
    };
  })();

  //RUN
  initBody();
  initField();
  initHelpElements(size);
};

export default game;
