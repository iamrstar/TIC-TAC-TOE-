const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let music = new Audio ("ring.mp3");
let winSound = new Audio ("win sound.mp3");
let tiedSound = new Audio ("tied.mp3");
let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // upadate for ui

  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    boxes[index].classList.remove("win");
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Ui update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let winner = "";
  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      winner = gameGrid[position[0]];
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (winner) {
    gameInfo.innerText = `Winner is - ${winner}`;
    newGameBtn.classList.add("active");
    winSound.play();
    // adding a winning gif soon
  } else {
    // Here is not a winner yet, check for a tie
    let fillCount = gameGrid.filter((box) => box !== "").length;

    if (fillCount === 9) {
      tiedSound.play();
      gameInfo.innerText = "Game Tied!";
    
      newGameBtn.classList.add("active");

      
    }
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    // Swap turn
    swapTurn();

    // Check if there's a winner or tie
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
music.play();
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
