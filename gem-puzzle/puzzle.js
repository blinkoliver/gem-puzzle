import { createHtmlElement } from "./utils.js";
let createPuzzle = (puzzleSize, top, left, content) => {
  if (content !== 0) {

    let puzzle = createHtmlElement("div", "puzzle");
    puzzle.style.width = `${puzzleSize}px`;
    puzzle.style.height = `${puzzleSize}px`;
    puzzle.style.top = `${top * puzzleSize}px`;
    puzzle.style.left = `${left * puzzleSize}px`;
    puzzle.innerHTML = content;
    return puzzle;
  } else {
    let puzzle = createHtmlElement("div", "nonpuzzle");
    puzzle.style.visibility = `hidden`;
    return puzzle;
  }
};
export default createPuzzle;
