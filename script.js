// gameBoard Module
const gameBoardModule = (function () {
  let gameBoardArray = ["", "", "", "", "", "", "", ""];
  return { gameBoardArray };
})();

// displayController Module
const displayController = (function () {
  let testF = console.log("test displayController");
  return { testF };
})();

// player Factory Function
const player = (name, mark, turn) => {
  return { name, mark, turn };
};

const playerOne = player("One", "X", true);
const playerTwo = player("Two", "O", false);

console.log((playerOne.name = "John"));
console.log(playerOne.name);

// function to render content of the gameboard

const renderContent = () => {
  const boxes = document.querySelectorAll(".row");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = gameBoardModule.gameBoardArray[i];
  }
};

// add marks to the screen
const addMarks = () => {
  const boxes = document.querySelectorAll(".row");
  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      const box = e.target;
      const boxIndex = box.getAttribute("data-index-number");
      const mark = playerOne.mark;
      gameBoardModule.gameBoardArray.splice(boxIndex, 1, mark);
      renderContent();
      console.log(gameBoardModule.gameBoardArray);
    });
  });
};

addMarks();
