//variables
let colorArrM = [];
let colorArrP = [];
let turn = 'mastermind';
let colorCheck = [];
let colorAutoCheck = [];
let round = 0;
const winCondition = ['white', 'white', 'white', 'white'];

//choose colors on button clicks
$('#red,#green,#blue,#navy,#pink,#yellow').on('click', function () {
    //mastermind turn
    if (turn === 'mastermind') {
        if (colorArrM.length < 4) {
            colorArrM.push($(this).attr("id"));
        } else {
            console.log("4 is max");
        }
        //player turn
    } else if (turn === 'player') {
        if (colorArrP.length < 4) {
            colorArrP.push($(this).attr("id"));
        } else {
            console.log("4 is max");
        }
    }
});

//give control to other player
$('.accept').on('click', function () {
    //mastermind turn
    if (turn === 'mastermind') {
        if (colorArrM.length === 4) {
            turn = 'player';
            console.log(colorArrM);
        } else {
            if (4 - colorArrM.length === 1) {
                console.log(`You still have to choose 1 more color!`)
            } else {
                console.log(`You still have to choose ${4 - colorArrM.length} more colors!`);
            }
        }
        //player turn
    } else if (turn === 'player') {
        if (colorArrP.length === 4) {
            turn = 'mCheck';
            console.log(colorArrP);
            $('.butt-wrapper').css({ 'bottom': '-1000px' })
            $('.bl-wrapper').css({ 'bottom': '5%' })
            colorFinder();
        } else {
            if (4 - colorArrM.length === 1) {
                console.log(`You still have to choose 1 more color!`)
            } else {
                console.log(`You still have to choose ${4 - colorArrM.length} more colors!`);
            }
        }
        //check turn
    } else if (turn === 'mCheck') {
        if (colorAutoCheck.length === colorCheck.length) {
            checkIfEqual();
        } else {
            console.log('thats not true');
        }
    }
});

//remove last color from array
$('.remove').on('click', function () {
    //mastermind turn
    if (turn === 'mastermind') {
        colorArrM.pop();
        //player turn
    } else if (turn === 'player') {
        colorArrP.pop();
    } else if (turn === 'mCheck') {
        colorCheck.pop();
    }
});

//black and white buttons
$('#black, #white').on('click', function () {
    if (colorCheck.length < 4) {
        colorCheck.push($(this).attr("id"));
    } else {
        return;
    }
});

function colorFinder() {
    //place white pins
    for (let i = 0; i < 4; i++) {
        if (colorArrM[i] === colorArrP[i]) {
            colorAutoCheck.push('white');
            colorArrP[i] = 'replaced';
        }
    }
    //place black pins
    for (let i = 0; i < 4; i++) {
        if (colorArrP.includes(colorArrM[i]) === true) {
            colorAutoCheck.push('black');
            colorArrP.remove(colorArrM[i])
        }
    }
}

//new round function
function startNewRound() {
    if (round === 9) {
        console.log('mastermind won the game');
        startNewGame();
    } else {
        console.log('new round')
        colorArrM = [];
        colorArrP = [];
        turn = 'mastermind';
        colorCheck = [];
        colorAutoCheck = [];
        round++;
        $('.butt-wrapper').css({ 'bottom': '2%' });
        $('.bl-wrapper').css({ 'bottom': '-1000px' });
    }
}

//new game function
function startNewGame() {
    console.log('new game')
    colorArrM = [];
    colorArrP = [];
    turn = 'mastermind';
    colorCheck = [];
    colorAutoCheck = [];
    round = 0;
    $('.butt-wrapper').css({ 'bottom': '2%' });
    $('.bl-wrapper').css({ 'bottom': '-1000px' });
}

//win condition checking
function checkWinCondition() {
    let i;
    for (i = 0; i < 4; i++) {
        if (colorAutoCheck.includes('white') === true) {
            colorAutoCheck.remove('white');
        } else {
            startNewRound();
            return;
        }
    }
    if (i === 4) {
        console.log('player won');
        startNewGame();
        return;
    }
}

//checking if colorAutoCheck == colorCheck
function checkIfEqual() {
    let i;
    for (i = 0; i < colorAutoCheck.length; i++) {
        console.log(i);
        if (colorCheck.includes(colorAutoCheck[i]) === true) {
            colorCheck.remove(colorAutoCheck[i]);
        } else {
            colorCheck = [];
            console.log('thats wrong');
            return;
        }
    }
    if (i === colorAutoCheck.length) {
        checkWinCondition();
    } else {
        colorCheck = [];
        console.log('thats wrong');
    }
}

//array.remove() function
Array.prototype.remove = function (value) {
    this.splice(this.indexOf(value), 1);
}
