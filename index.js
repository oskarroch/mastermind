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

let GenerateAnswer = () => {
  let array = [];
  for (let i = 0; i < 4; i++) {
    array.push(
      Object.byString(Colors, Math.floor(Math.random() * 4).toString())
    );
  }

  return array;
};

//variables
let round = 0;

let Colors = {
  0: "red",
  1: "navy",
  2: "green",
  3: "blue",
  4: "yellow",
  5: "pink",
};

let GameHistory = {};

let GameState = {
  answer: GenerateAnswer(),
  player: [],
  check: [],
};

//choose colors on button clicks
$("#red,#green,#blue,#navy,#pink,#yellow").on("click", function () {
  GameState.player.length < 4
    ? GameState.player.push($(this).attr("id"))
    : console.log("4 is max");
  console.log(GameState.player);
});

$("#accept").on("click", () => {
  if (GameState.player.length === 4) {
    colorFinder();
  } else {
    GameState.player.length === 3
      ? console.log(`You still have to choose 1 more color!`)
      : console.log(
          `You still have to choose ${4 - GameState.player.length} more colors!`
        );
  }
});

//remove last color from array
$("#remove").on("click", () => {
  GameState.player.pop();
  console.log(GameState.player);
});

function colorFinder() {
  //place white pins
  for (let i = 0; i < 4; i++) {
    if (GameState.answer[i] === GameState.player[i]) {
      GameState.check.push("white");
      GameState.player[i] = "replaced";
    }
  }
  //place black pins
  for (let i = 0; i < 4; i++) {
    if (GameState.player.includes(GameState.answer[i]) === true) {
      GameState.check.push("black");
      GameState.player.remove(GameState.answer[i]);
    }
  }
  console.log(GameState.check);
  checkWinCondition();
}

//win condition checking
function checkWinCondition() {
  let i;
  for (i = 0; i < 4; i++) {
    if (GameState.check.includes("white") === true) {
      GameState.check.remove("white");
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

//new round function
function startNewRound() {
  if (round === 9) {
    console.log("mastermind won the game");
    startNewGame();
  } else {
    console.log("new round");
    GameState.player = [];
    GameState.check = [];
    round++;
  }
}

//new game function
function startNewGame() {
  console.log("new game");
  GameState.answer = GenerateAnswer();
  GameState.player = [];
  GameState.check = [];
  round = 0;
}

//array.remove() function
Array.prototype.remove = function (value) {
  this.splice(this.indexOf(value), 1);
};
