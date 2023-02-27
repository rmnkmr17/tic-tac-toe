const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  const getGameboard = () => gameboard;

  return { render, update, getGameboard };
})();

const createPlayer = (name, mark) => {
  return { name, mark };
};

const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#message").textContent = message;
  };
  return {
    renderMessage,
  };
})();

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const handleClick = (e) => {
    let index = parseInt(e.target.id[e.target.id.length - 1]);
    if (Gameboard.getGameboard()[index] !== "") {
      return;
    }
    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (
      checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} won!`
      );
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayController.renderMessage("It's a tie!");
    }
    if (gameOver) {
      return;
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restartGame = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    gameOver = false;
    document.querySelector("#message").textContent = "";
    Gameboard.render();
  };
  return { start, handleClick, restartGame };
})();

function checkForWin(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", Game.restartGame);

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.start();
});
