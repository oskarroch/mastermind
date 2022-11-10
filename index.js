//variables
let colorArrM = [];
let colorArrP = [];
let turn = "mastermind";
let colorCheck = [];
let colorAutoCheck = [];
let round = 0;

//choose colors on button clicks
$("#red,#green,#blue,#navy,#pink,#yellow").on("click", function () {
  //mastermind turn
  if (turn === "mastermind") {
    colorArrM.length < 4
      ? colorArrM.push($(this).attr("id"))
      : console.log("4 is max");
    console.log(colorArrM);
    //player turn
  } else if (turn === "player") {
    colorArrP.length < 4
      ? colorArrP.push($(this).attr("id"))
      : console.log("4 is max");
    console.log(colorArrP);
  }
});

//give control to other player
$("#accept").on("click", () => {
  //mastermind turn
  if (turn === "mastermind") {
    if (colorArrM.length === 4) {
      console.log("player turn");
      turn = "player";
    } else {
      colorArrM.length === 3
        ? console.log(`You still have to choose 1 more color!`)
        : console.log(
            `You still have to choose ${4 - colorArrM.length} more colors!`
          );
    }
    //player turn
  } else if (turn === "player") {
    if (colorArrP.length === 4) {
      console.log("mastermind turn");
      turn = "mCheck";
      $("#buttonWrapper").css({ bottom: "-1000px" });
      $("#blackWhiteWrapper").css({ bottom: "5%" });
      colorFinder();
    } else {
      colorArrP.length === 3
        ? console.log(`You still have to choose 1 more color!`)
        : console.log(
            `You still have to choose ${4 - colorArrM.length} more colors!`
          );
    }
    //check turn
  } else if (turn === "mCheck") {
    if (colorAutoCheck.length === colorCheck.length) {
      checkIfEqual();
    } else {
      colorCheck = [];
      console.log("thats not true");
    }
  }
});

//remove last color from array
$("#remove").on("click", () => {
  //mastermind turn
  if (turn === "mastermind") {
    colorArrM.pop();
    console.log(colorArrM);
    //player turn
  } else if (turn === "player") {
    colorArrP.pop();
    console.log(colorArrP);
  } else if (turn === "mCheck") {
    colorCheck.pop();
    console.log(colorCheck);
  }
});

//black and white buttons
$("#black, #white").on("click", function () {
  if (colorCheck.length < 4) {
    colorCheck.push($(this).attr("id"));
    console.log(colorCheck);
  } else {
    return;
  }
});

function colorFinder() {
  //place white pins
  for (let i = 0; i < 4; i++) {
    if (colorArrM[i] === colorArrP[i]) {
      colorAutoCheck.push("white");
      colorArrP[i] = "replaced";
    }
  }
  //place black pins
  for (let i = 0; i < 4; i++) {
    if (colorArrP.includes(colorArrM[i]) === true) {
      colorAutoCheck.push("black");
      colorArrP.remove(colorArrM[i]);
    }
  }
}

//new round function
function startNewRound() {
  if (round === 9) {
    console.log("mastermind won the game");
    startNewGame();
  } else {
    console.log("new round");
    colorArrM = [];
    colorArrP = [];
    turn = "mastermind";
    colorCheck = [];
    colorAutoCheck = [];
    round++;
    $("#buttonWrapper").css({ bottom: "2%" });
    $("#blackWhiteWrapper").css({ bottom: "-1000px" });
  }
}

//new game function
function startNewGame() {
  console.log("new game");
  colorArrM = [];
  colorArrP = [];
  turn = "mastermind";
  colorCheck = [];
  colorAutoCheck = [];
  round = 0;
  $("#buttonWrapper").css({ bottom: "2%" });
  $("#blackWhiteWrapper").css({ bottom: "-1000px" });
}

//win condition checking
function checkWinCondition() {
  let i;
  for (i = 0; i < 4; i++) {
    if (colorAutoCheck.includes("white") === true) {
      colorAutoCheck.remove("white");
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

//checking if colorAutoCheck === colorCheck
function checkIfEqual() {
  let i;
  for (i = 0; i < colorAutoCheck.length; i++) {
    if (colorCheck.includes(colorAutoCheck[i]) === true) {
      colorCheck.remove(colorAutoCheck[i]);
    } else {
      colorCheck = [];
      console.log("thats wrong");
      return;
    }
  }
  if (i === colorAutoCheck.length) {
    checkWinCondition();
  } else {
    colorCheck = [];
    console.log("thats wrong");
  }
}

//array.remove() function
Array.prototype.remove = function (value) {
  this.splice(this.indexOf(value), 1);
};
