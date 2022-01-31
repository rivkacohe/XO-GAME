const playerX = document.getElementById("playerX"),
  playerO = document.getElementById("playerO"),
  playerXScores = document.getElementById("xScores"),
  playerOScores = document.getElementById("oScores"),
  winMessage = document.querySelector(".winMessage");
let XScores = 0,
  OScores = 0;

let currentPlayer = "x";
playerX.style.backgroundColor = "aquamarine";
const gameBlocks = [
  document.getElementById("blockOne"),
  document.getElementById("blockTwo"),
  document.getElementById("blockThree"),
  document.getElementById("blockFour"),
  document.getElementById("blockFive"),
  document.getElementById("blockSix"),
  document.getElementById("blockSeven"),
  document.getElementById("blockEight"),
  document.getElementById("blockNine"),
];

let gameState = ["", "", "", "", "", "", "", "", ""];

for (let i = 0; i < gameBlocks.length; i++) {
  gameBlocks[i].addEventListener("click", () => {
    if (currentPlayer === "x") {
      addPlayerMark(gameBlocks[i], "&#10008;", i);
      gameBlocks[i].classList.add("preventPointerEvent");
      let win = checkWin();
      if (win === "win") {
        raiseScore(playerXScores);
        showWinMessage();
        setTimeout(resetBoardGame, 3000);
      }
      currentPlayer = "o";
      indicateCurrentPlayer(playerO, playerX);
    } else if (currentPlayer === "o") {
      addPlayerMark(gameBlocks[i], "&#9898;", i);
      gameBlocks[i].classList.add("preventPointerEvent");
      let win = checkWin();
      if (win === "win") {
        raiseScore(playerOScores);
        showWinMessage();
        setTimeout(resetBoardGame, 3000);
      }
      currentPlayer = "x";
      indicateCurrentPlayer(playerX, playerO);
    }

    if (gameState.every((element) => element !== "")) {
      console.log(true);
      setTimeout(resetBoardGame, 3000);
    }
  });
}

function addPlayerMark(gameBlocks, mark, gameStateI) {
  gameBlocks.innerHTML = mark;
  gameState[gameStateI] = currentPlayer;
}
function checkWin() {
  if (
    (gameState[0] === currentPlayer &&
      gameState[1] === currentPlayer &&
      gameState[2] === currentPlayer) ||
    (gameState[3] === currentPlayer &&
      gameState[4] === currentPlayer &&
      gameState[5] === currentPlayer) ||
    (gameState[6] === currentPlayer &&
      gameState[7] === currentPlayer &&
      gameState[8] === currentPlayer) ||
    (gameState[0] === currentPlayer &&
      gameState[3] === currentPlayer &&
      gameState[6] === currentPlayer) ||
    (gameState[1] === currentPlayer &&
      gameState[4] === currentPlayer &&
      gameState[7] === currentPlayer) ||
    (gameState[2] === currentPlayer &&
      gameState[5] === currentPlayer &&
      gameState[8] === currentPlayer) ||
    (gameState[0] === currentPlayer &&
      gameState[4] === currentPlayer &&
      gameState[8] === currentPlayer) ||
    (gameState[2] === currentPlayer &&
      gameState[4] === currentPlayer &&
      gameState[6] === currentPlayer)
  ) {
    return "win";
  }
}

function raiseScore(playerScores) {
  if (currentPlayer === "x") {
    XScores++;
    playerScores.innerHTML = XScores;
  } else {
    OScores++;
    playerScores.innerHTML = OScores;
  }
}

function resetBoardGame() {
  gameBlocks.forEach((block) => {
    block.innerHTML = "";
    block.classList.remove("preventPointerEvent");
  });
  gameState = ["", "", "", "", "", "", "", "", ""];
}

function indicateCurrentPlayer(player1, player2) {
  if (currentPlayer) {
    player1.style.backgroundColor = "aquamarine";
    player2.style.backgroundColor = "white";
  }
}

function showWinMessage() {
  winMessage.innerHTML = `Well done player ${currentPlayer}!`;
  winMessage.style.display = "flex";
  setTimeout(function () {
    winMessage.style.display = "none";
  }, 3000);
}
