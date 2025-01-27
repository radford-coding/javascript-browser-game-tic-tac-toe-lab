/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const theBoard = document.querySelector('.board');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

// initializing
function init() {
    // create an array of n=9 empty strings
    board = [...Array(9)].map(() => '');
    turn = player1;
    winner = false;
    tie = false;
    render();
};

function render() {
    updateBoard();
    updateMessage();
};

// display the board state for the user
function updateBoard() {
    squareEls.forEach(s => s.innerText = board[s.id]);
};

// appropriately display text for the user
function updateMessage() {
    if (!winner && !tie) {
        messageEl.innerText = `${turn}'s turn`;
    } else if (!winner && tie) {
        messageEl.innerText = 'wow what a riveting game. try again';
    } else {
        messageEl.innerText = `${turn} wins!`;
    };
};

// logic for handling a click event e
function handleClick(e) {
    const squareIndex = e.target.id;
    if (board[squareIndex] !== '') { // square already occupied
        return;
    } else if (winner) { // game over
        return;
    } else { // game logic
        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
    };
};

// put the current player's piece on the board
function placePiece(index) {
    board[index] = turn;
};

// check whether someone has won
function checkForWinner() {
    for (let winCombo = 0; winCombo < winningCombos.length; winCombo++) { // loop through winningCombos array
        let a = winningCombos[winCombo][0], b = winningCombos[winCombo][1], c = winningCombos[winCombo][2]; // shorthands. helpful for debugging
        if (board[a] !== '' && board[b] === board[a] && board[c] === board[a]) {
            winner = true;
            break; // no need to continue
        };
    };
};

// check whether there's a tie
function checkForTie() {
    if (winner) {
        return;
    } else if (board.includes('')) {
        return;
    } else {
        tie = true;
    };
};

// alternate turns. sharing is caring folks.
function switchPlayerTurn() {
    if (winner) {
        return;
    } else {
        if (turn === player1) { // now x/o agnostic
            turn = player2;
        } else {
            turn = player1;
        };
    };
};

/*----------------------------- Event Listeners -----------------------------*/

theBoard.addEventListener('click', (e) => {
    if (e.target.className === 'sqr') {
        handleClick(e);
    } else {
        return;
    };
});

resetBtnEl.addEventListener('click', () => {
    choose();
});

/*----------------------------- initialize ----------------------------------*/

// init(); // moved to after the symbol selection

/*----------------------------- level up content ----------------------------*/

// cached reference to the available icon choices
const choiceEls = document.querySelectorAll('.choice'); // clickables
const choosing = document.querySelector('.choosing'); // choice elements
const choiceMessage = document.querySelector('#choice-message');

// variables for the player icons and counter
let player1, player2;
let playerNum = 1;

// functions

function handleChoice(e) {
    if (playerNum === 1) {
        player1 = e.target.innerText;
        e.target.style.color = 'black'; // sort of hide it
        playerNum += 1;
        choose();
    } else if (playerNum === 2) {
        player2 = e.target.innerText;
        choosing.style.display = 'none';
        theBoard.style.display = 'flex';
        playerNum = 1;
        choiceEls.forEach(c => c.style.color = 'white'); // sort of unhide it
        init();
    };
};


function choose() {
    messageEl.innerText = '';
    theBoard.style.display = 'none';
    choosing.style.display = 'flex';
    choiceMessage.innerText = `Please select an icon for player ${playerNum}`;
};

choose();


// event listeners for the initial two icon choices
choiceEls.forEach(c => c.addEventListener('click', handleChoice));


// prompt user to make a choice for player1, player2
// hide choices and show the game board
// use those choices for the game
// reset() returns to piece selection
