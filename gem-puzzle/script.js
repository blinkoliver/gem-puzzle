import game from "./game.js";
import { getFromLocalStorage, setToLocalStorage } from "./utils.js";

setToLocalStorage("size", 4);
let size = getFromLocalStorage("size");

game(size);