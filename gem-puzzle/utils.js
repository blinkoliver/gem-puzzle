export let createHtmlElement = (
  el,
  classNames,
  childs,
  parent,
  ...dataAttr
) => {
  //Create element
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error("bad tag element");
  }
  //Add ClassName
  if (classNames) {
    element.classList.add(...classNames.split(" "));
  }
  //Add Child
  if (childs && Array.isArray(childs)) {
    childs.forEach((childElement) => {
      childElement && element.appendChild(childElement);
    });
  } else if (childs && typeof childs === "object") {
    element.appendChild(childs);
  } else if (childs && typeof childs === "string") {
    element.innerHTML = childs;
  }
  //Add Parent
  if (parent) {
    parent.appendChild(element);
  }
  //Add DatAttr
  if (dataAttr.length > 0) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === "") {
        element.setAttribute(attrName, "");
      } else {
        if (
          attrName.match(
            /value|id|placeholder|cols|rows|autocorrect|spellcheck/
          )
        ) {
          element.setAttribute(attrName, attrValue);
        } else {
          element.dataset[attrName] = attrValue;
        }
      }
    });
  }

  return element;
};

export let getFromLocalStorage = (key) => localStorage.getItem(`${key}`);

export let setToLocalStorage = (key, value) => {
  localStorage.setItem(`${key}`, value);
};

export const isSolvable = (arr) => {
  let number_of_inv = 0;
  // get the number of inversions
  for (let i = 0; i < arr.length; i++) {
    // i picks the first element
    for (let j = i + 1; j < arr.length; j++) {
      // check that an element exist at index i and j, then check that element at i > at j
      if (arr[i] && arr[j] && arr[i] > arr[j]) number_of_inv++;
    }
  }
  console.log(number_of_inv);
  return number_of_inv % 2 == 0;
};

export const shuffle = (arr) => {
  const copy = [...arr];
  // loop over the array
  for (let i = 0; i < copy.length; i++) {
    // for each index,i pick a random index j
    let j = parseInt(Math.random() * copy.length);
    // swap elements at i and j
    let temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
};
export const createArr = (size) => {
  let numbers = [].fill("");
  numbers[size ** 2 - 1] = "";
  numbers.fill("");
  numbers = numbers.map((el, ind) => ind);

  let shuffle = (array, repeat) => {
    for (let i = 0; i <= repeat; i += 1) {
      array.sort(() => Math.random() - 0.5);
    }
  };
  shuffle(numbers);
  return result;
};
export let getCorrectArray = (size) => {
  let numbers = [].fill("");
  numbers[size ** 2 - 1] = "";
  numbers.fill("");
  numbers = numbers.map((el, ind) => ind);

  let shuffle = (array, repeat) => {
    for (let i = 0; i <= repeat; i += 1) {
      array.sort(() => Math.random() - 0.5);
    }
  };
  shuffle(numbers, size ** 2);

  const field = [];
  for (let i = 0; i < size; i += 1) {
    field[i] = [];
    for (let j = 0; j < size; j += 1) {
      field[i][j] = numbers.pop();
    }
  }

  return field.flat();
};