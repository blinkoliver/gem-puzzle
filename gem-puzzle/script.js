import game from "./game.js";
import { getFromLocalStorage, setToLocalStorage } from "./utils.js";

if (!getFromLocalStorage("size")) {
  setToLocalStorage("size", 4);
}
let size = getFromLocalStorage("size");

if (!getFromLocalStorage("savedGameArr")) {
  setToLocalStorage("savedGameArr", "");
}
let savedGameArr = getFromLocalStorage("savedGameArr").split(",").map((element) => parseInt(element));

game(size, savedGameArr);
