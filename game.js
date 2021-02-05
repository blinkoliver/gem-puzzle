import {
  createHtmlElement,
  getCorrectArray,
  getFromLocalStorage,
  setToLocalStorage,
} from "./utils.js";
import startTimer from "./timer.js";
import createPuzzle from "./puzzle.js";

let game = (size) => {
  let puzzleSize = "";
  let randomArr = getCorrectArray(size);
  let moves = 0;

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

        let puzzlesWithoutEmpty = puzzles.filter((element) => {
          return element.value !== 0;
        });
        let isWin = puzzlesWithoutEmpty.every((element) => {
          return element.value === element.top * size + element.left + 1;
        });

        isWin ? console.log(isWin) : (moves += 1);
        moves === 1 ? startTimer() : null;
        document.querySelector(".moves").innerHTML = `moves: ${moves}`;
      };

      puzzle.addEventListener("click", () => movePuzzle(i));
    }
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
      reInitGame(getFromLocalStorage("size"));
    });
    //init timer
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
      reInitGame(getFromLocalStorage("size"));
    });
    //init best games element
    let bestGamesElement = createHtmlElement(
      "i",
      "fas fa-table",
      null,
      document.querySelector(".footer")
    );
    let muteElement = createHtmlElement(
      "i",
      "fas fa-volume-mute",
      null,
      document.querySelector(".footer")
    );
    let volumeElement = createHtmlElement(
      "i",
      "fas fa-volume-up",
      null,
      document.querySelector(".footer")
    );
    let assembleElement = createHtmlElement(
      "i",
      "fas fa-puzzle-piece",
      null,
      document.querySelector(".footer")
    );
    let saveGameElement = createHtmlElement(
      "i",
      "far fa-save",
      null,
      document.querySelector(".footer")
    );
  };

    
  let reInitGame = (size) => {
    deleteGame();
    game(size);
  };
  let deleteGame = () => {
    document.querySelector(".header").remove();
    document.querySelector(".main").remove();
    document.querySelector(".footer").remove();
  };

  let saveGame = () => {};

  (function () {
    window.addEventListener("resize", resizeThrottler, false);
    var resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
        }, 500);
      }
    }
    let actualResizeHandler = () => {
      reInitGame(size);
    };
  })();

  //RUN
  initBody();
  initField();
  initHelpElements(size);
};

export default game;
