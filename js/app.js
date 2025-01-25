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
    turn = 'X';
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
    // not sure how to use forEach() here, as board and squareEls aren't related except by index position?
    for (i = 0; i < board.length; i++) {
        squareEls[i].innerText = board[i];
    };

};

// appropriately display text for the user
function updateMessage() {
    if (!winner && !tie) {
        messageEl.innerText = `it's ${turn}'s turn`;
    } else if (!winner && tie) {
        messageEl.innerText = 'wow what a riveting game. try again nerds';
    } else {
        messageEl.innerText = `${turn} wins!`;
    };
};

// logic for handling a click event e
function handleClick(e) {
    // console.log('ow! ' + e.target.id);
    const squareIndex = e.target.id;
    if (board[squareIndex] !== '') { // square already occupied
        return;
    } else if (winner) { // game over
        return;
    } else {
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

// alternate turns. sharing is caring.
function switchPlayerTurn() {
    if (winner) {
        return;
    } else {
        if (turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
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
    init();
});

/*----------------------------- initialize ----------------------------------*/

init();