// select necessary elements & add them to the variable
let gameContainer = document.querySelector(".game-container");
let boxs = document.querySelectorAll(".boxs");
let winnerBox = document.querySelector(".winner");
let winnerMessage = document.querySelector(".winner h1");
let resetBtn = document.querySelector(".reset-btn");
let replayGame = document.querySelector(".replay-btn");

let turnO = true;
let count = 0;

// winner pattern
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
// loop the all-game play box and click the event
boxs.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = `<i class="fa-regular fa-circle"></i>`;
      turnO = false;
    } else {
      box.innerHTML = `<i class="fa-solid fa-x"></i>`;
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    console.log(count);

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});
// check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxs[pattern[0]].innerHTML;
    let pos2 = boxs[pattern[1]].innerHTML;
    let pos3 = boxs[pattern[2]].innerHTML;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWiner(pos1);
      }
    }
  }
};
// shown winner
const showWiner = (pos1) => {
  gameContainer.classList.add("active");
  winnerBox.classList.add("active");
  winnerMessage.innerHTML = `Congratulation!  ${pos1}  player winner`;
  disableBtn();
};
// diable btn
const disableBtn = () => {
  for (let box of boxs) {
    box.disabled = true;
  }
};
// enable btn
const enableBtn = () => {
  for (let box of boxs) {
    box.innerHTML = "";
    box.disabled = false;
  }
};
// game draw
const gameDraw = () => {
  winnerMessage.innerText = `Game was a Draw`;
  gameContainer.classList.add("active");
  winnerBox.classList.add("active");
  for (let box of boxs) {
    box.innerHTML = "";
  }
};
// reset game
const resetGame = () => {
  turnO = true;
  enableBtn();
};
// event listener
resetBtn.addEventListener("click", resetGame);
replayGame.addEventListener("click", () => {
  gameContainer.classList.remove("active");
  winnerBox.classList.remove("active");
  enableBtn();
  count = 0;
});
