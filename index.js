// An object containing the possible colors for the game
const colorOptions = {
  0: "red",
  1: "navy",
  2: "green",
  3: "blue",
  4: "yellow",
  5: "pink",
};

// Object containing whole history of player choices and pins
const gameHistory = {};

let gameState = {
  answer: generateAnswerSequence(), // Game answer
  player: [], // Array of player choices
  playerConst: [], // Player array that will be pushed into gameHistory object
  check: [], // Array storing white and black pins
  currentRound: 0, // The current round number
};

// Choose colors on button clicks
const elements = document.querySelectorAll(
  "#red,#green,#blue,#navy,#pink,#yellow"
);

// Generates a random sequence of colors
function generateAnswerSequence() {
  // Create an empty array to store the answer sequence
  let sequence = [];

  // Generate a random number between 0 and 5
  for (let i = 0; i < 4; i++) {
    // Use the random number to look up a color in the colorOptions object
    // and push it to the sequence array
    sequence.push(colorOptions[Math.floor(Math.random() * 6)]);
  }

  // Return the generated sequence
  return sequence;
}

elements.forEach(function (element) {
  element.addEventListener("click", function () {
    if (gameState.player.length < 4) {
      gameState.player.push(this.id);
    } else {
      console.log("4 is max");
    }
    if (gameState.playerConst.length < 4) {
      gameState.playerConst.push(this.id);
    } else {
      console.log("4 is max");
    }
    console.log(gameState.player);
  });
});

document.getElementById("accept").onclick = () => {
  if (gameState.player.length === 4) {
    checkPlayerGuess();
  } else {
    gameState.player.length === 3
      ? console.log(`You still have to choose 1 more color!`)
      : console.log(
          `You still have to choose ${4 - gameState.player.length} more colors!`
        );
  }
};

//remove last color from array
document.getElementById("remove").onclick = () => {
  gameState.player.pop();
  console.log(gameState.player);
};

/**
 * checkPlayerGuess checks the player's guess against the correct answer sequence
 * and determines how many white and black pins should be awarded.
 *
 * White pins are awarded for correct colors in the correct positions.
 * Black pins are awarded for correct colors in the incorrect positions.
 */
function checkPlayerGuess() {
  //place white pins
  for (let i = 0; i < 4; i++) {
    if (gameState.answer[i] === gameState.player[i]) {
      gameState.check.push("white");
      gameState.player[i] = "";
    }
  }
  //place black pins
  for (let i = 0; i < 4; i++) {
    if (gameState.player.includes(gameState.answer[i]) === true) {
      gameState.check.push("black");
      gameState.player[i] = "";
    }
  }
  checkWinCondition();
}

/**
 * checkWinCondition checks if the player has won the game by checking if
 * all of the player's choices have been awarded white pins.
 *
 * If the player has won, the game is restarted. If the player has not won,
 * a new round is started and the player can make more guesses.
 */

function checkWinCondition() {
  let i;
  for (i = 0; i < 4; i++) {
    if (gameState.check.includes("white") === true) {
      gameState.check.remove("white");
    } else {
      startNewRound();
      return;
    }
  }
  if (i === 4) {
    console.log("player won");
    startNewGame();
    return;
  }
}

// Function starting new round
function startNewRound() {
  if (gameState.currentRound === 9) {
    console.log("mastermind won the game");
    startNewGame();
  } else {
    gameHistory[gameState.currentRound] = {
      player: gameState.playerConst,
      check: gameState.check,
    };
    console.log(gameHistory);
    console.log("new round");
    gameState.player = [];
    gameState.check = [];
    gameState.currentRound++;
  }
}

// Function starting new game
function startNewGame() {
  console.log("new game");
  gameState.answer = generateAnswerSequence();
  gameState.player = [];
  gameState.check = [];
  gameState.currentRound = 0;
}

//array.remove() function
Array.prototype.remove = function (value) {
  this.splice(this.indexOf(value), 1);
};

Object.byString = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, ".$1");
  s = s.replace(/^\./, "");
  let a = s.split(".");
  for (let i = 0, n = a.length; i < n; ++i) {
    let k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
