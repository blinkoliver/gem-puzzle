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
