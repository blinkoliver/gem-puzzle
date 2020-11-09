import {
  createHtmlElement,
  shuffle,
  getFromLocalStorage,
  setToLocalStorage,
} from "./utils.js";
import createTimer from "./timer.js";
import CreateTimer from "./CreateTimer.js"
import createPuzzle from "./puzzle.js";

let game = (size) => {
  let numberOfPuzzles = size * size;
  let puzzleSize = "";
  let randomArr = shuffle(
    Array.from({ length: numberOfPuzzles }, (_, i) => i + 1)
  );

  let initBody = () => {
    let header = createHtmlElement("header", "header");
    let main = createHtmlElement("main", "main");
    let footer = createHtmlElement("footer", "footer");
    document.body.append(header, main, footer);
    return { header, footer };
  };

  let initField = () => {
    let empty = {
      top: 0,
      left: 0,
    };
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

    const puzzles = [];
    puzzles.push(empty);

    for (let i = 1; i <= randomArr.length - 1; i++) {
      let left = i % size;
      let top = (i - left) / size;

      const puzzle = createPuzzle(puzzleSize, top, left, i);
      field.appendChild(puzzle);

      puzzles.push({
        left: left,
        top: top,
        element: puzzle,
      });

      let movePuzzle = (index) => {
    CreateTimer().startTimer();
        const puzzle = puzzles[index];
        puzzle.element.style.top = `${empty.top * puzzleSize}px`;
        puzzle.element.style.left = `${empty.left * puzzleSize}px`;

        const emptyLeft = empty.left;
        const emptyTop = empty.top;

        empty.left = puzzle.left;
        empty.top = puzzle.top;

        puzzle.left = emptyLeft;
        puzzle.top = emptyTop;
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
    let timerElement = createHtmlElement(
      "div",
      "timer",
      null,
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
  new CreateTimer();
};

export default game;
