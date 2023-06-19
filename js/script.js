// Extra Credit
function generateRandomColor() {
  const maxValue = 0xFFFFFF;
  const randomValue = Math.floor(Math.random() * maxValue + 1).toString(16);
  return `#${randomValue}`;
}

function changeSquareBackgroundColorToRandom(event) {
  event.target.style.backgroundColor = generateRandomColor();
}

function changeSquareBackgroundColorToBlack(event) {
  event.target.style.backgroundColor = 'black';
}

function changeSelectedToBlackAndWhiteButton() {
  const blackAndWhiteButton = document.getElementById('black-and-white');
  const randomButton = document.getElementById('random');
  blackAndWhiteButton?.classList.add('selected');
  randomButton?.classList.remove('selected');
}

function changeSelectedToRandomButton() {
  const blackAndWhiteButton = document.getElementById('black-and-white');
  const randomButton = document.getElementById('random');
  randomButton?.classList.add('selected');
  blackAndWhiteButton?.classList.remove('selected');
}

function addHoverEffect(elem, effect) {
  elem.addEventListener('mouseenter', effect);
}

function createRowSquares(numOfSquares) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('square-row');

  for (let i = 0; i < numOfSquares; i++) {
    const row = document.createElement('div');
    addHoverEffect(row, changeSquareBackgroundColorToBlack);
    changeSelectedToBlackAndWhiteButton();
    rowDiv.appendChild(row);
  }

  return rowDiv;
}

function createGridSquares(numOfSquares) {
  const sketchPad = document.getElementById('sketch-pad');

  for (let i = 0; i < numOfSquares; i++) {
    const row = createRowSquares(numOfSquares);
    sketchPad?.appendChild(row);
  }
}

function resetGridSquares() {
  const sketchPad = document.getElementById('sketch-pad');

  if (sketchPad !== null) {
    sketchPad.innerHTML = '';
  }
}

function changeGridSquares(numOfSquares) {
  resetGridSquares();
  createGridSquares(numOfSquares);
}

function userInputIsValidNumber(input) {
  const inputNumber = Number(input);
  const maxNumber = 100;

  return input !== null
    && input !== ''
    && !Number.isNaN(inputNumber)
    && inputNumber > 0
    && inputNumber <= maxNumber;
}

function addListenerToSetNumberOfSquares() {
  const setButton = document.getElementById('set-squares');
  setButton?.addEventListener('click', () => {
    const numOfSquares = prompt('Set number of squares (max: 100): ');

    if (userInputIsValidNumber(numOfSquares)) {
      changeGridSquares(Number(numOfSquares));
    } else {
      alert('Input is not valid');
    }
  });
}

function addListenerToResetSketchButton() {
  const resetButton = document.getElementById('reset-sketch');
  resetButton?.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square-row > div');
    squares.forEach((square) => {
      square.removeAttribute('style');
    });
  });
}

function changeGridSquaresEffect(effect) {
  const squares = document.querySelectorAll('.square-row > div');
  squares.forEach((square) => {
    const newSquare = square.cloneNode(true);
    square.replaceWith(newSquare);
    addHoverEffect(newSquare, effect);
  });
}

function addListenerToColorModeButton() {
  const blackAndWhiteButton = document.getElementById('black-and-white');
  const randomButton = document.getElementById('random');

  blackAndWhiteButton?.addEventListener('click', () => {
    changeGridSquaresEffect(changeSquareBackgroundColorToBlack);
    changeSelectedToBlackAndWhiteButton();
  });

  randomButton?.addEventListener('click', () => {
    changeGridSquaresEffect(changeSquareBackgroundColorToRandom);
    changeSelectedToRandomButton();
  });
}

function main() {
  const initialNumOfSquares = 16;

  createGridSquares(initialNumOfSquares);
  addListenerToSetNumberOfSquares();
  addListenerToResetSketchButton();
  addListenerToColorModeButton();
}

main();
