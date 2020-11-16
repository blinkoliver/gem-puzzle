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
            /value|id|placeholder|cols|rows|autocorrect|spellcheck|src/
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
  let result = [];
  let shuffle = (array) => {
    for (let i = 0; i <= size ** 2; i += 1) {
      array.sort(() => Math.random() - 0.5);
    }
    result.push(array);
  };
  shuffle(numbers);
  return result;
};
export let getCorrectArray = (size) => {
  let linearArr = createArr(size);
  let shuffleArr = shuffle(linearArr.flat());

  while (!isSolvable(shuffleArr)) {
    shuffleArr = shuffle(linearArr.flat());
  }

  return shuffleArr;
};

export let sortForSave = (arr, size, empty) => {
  let withoutEmpty = arr.filter((element) => element.value !== 0);
  let arrForSave = [];

  for (let i = 0; i < size; i++) {
    let rows = withoutEmpty.filter((element) => {
      return element.top === i;
    });
    if (rows.length === size - 1) {
      rows.push(empty);
    }
    rows.sort((a, b) => {
      return a.left - b.left;
    });
    arrForSave.push(rows);
  }
  let result = arrForSave.flat().map((element) => {
    return element.value;
  });
  return result;
};

export let showModal = (content) => {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".modal").appendChild(content);
};
