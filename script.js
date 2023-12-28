// Selecting DOM elements
const statusDisplay = document.querySelector('.game--status');
const x_score = document.querySelector('.x-score');
const y_score = document.querySelector('.y-score');
const x_name = document.querySelector('.player1_name')
const y_name = document.querySelector('.player2_name')
var scoreBoard = document.querySelector('.score-board');



function playerNameAssign(){
    let player1_ = document.getElementById("player1");
    let player2_ = document.getElementById("player2");
    // Retrieve the value of the input element
    player1 = player1_.value;
    player2 = player2_.value;
    x_name.innerHTML = `${player1}`;
    y_name.innerHTML = `${player2}`;
    player2_.value = "";
    player1_.value = "";
    // Display the value in the console (optional)
    console.log("Input Value:", player1,player2);

}

// Variables for tracking scores
var scoreScreen = false;
currentXScore = 0;
currentYScore = 0;

// Game state variables
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning conditions for the game
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Functions to display messages
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `${currentPlayer} take the turn! ⏳`;

// Initial message display
statusDisplay.innerHTML = currentPlayerTurn();

// Function to handle player change
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Function to display winning message and update scores
function winningMessage(){
    if(currentPlayer == "X"){
        currentXScore+=1;
    }
    else{
       currentYScore+=1;
    }
    return `Player ${currentPlayer} has won!🎯`;
};

// Function to validate game result
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Function to handle cell played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Function to handle cell click event
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to restart the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Function to toggle the score board
function toggleScoreBoard(){
    x_score.innerHTML = `${currentXScore}`;
    y_score.innerHTML = `${currentYScore}`;
    if(scoreBoard){
        scoreBoard.style.zIndex = scoreScreen? -1 : 2;
        scoreScreen = !scoreScreen;
    }
}

// Event listeners for score board and game elements
document.querySelector('.score-button').addEventListener('click', toggleScoreBoard);
document.querySelector('.close').addEventListener('click', toggleScoreBoard);
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
document.querySelector('.player_input').addEventListener('click', playerNameAssign);