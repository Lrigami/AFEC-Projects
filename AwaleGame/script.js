// declarations.
const cells = document.querySelectorAll("td");
const cellOne = document.getElementById("cell1");
const cellTwo = document.getElementById("cell2");
const cellThree = document.getElementById("cell3");
const cellFour = document.getElementById("cell4");
const cellFive = document.getElementById("cell5");
const cellSix = document.getElementById("cell6");
const cellSeven = document.getElementById("cell7");
const cellEight = document.getElementById("cell8");
const cellNine = document.getElementById("cell9");
const cellTen = document.getElementById("cell10");
const cellEleven = document.getElementById("cell11");
const cellTwelve = document.getElementById("cell12");

let currentPlayer = 1;
let opponent = 2;
const turnParagraph = document.getElementById("turn");
const playerBoardOne = document.getElementById("player-board-1");
const playerBoardTwo = document.getElementById("player-board-2");
let playerBoard = document.getElementById(`player-board-${currentPlayer}`);

let playerCells1 = [cellOne, cellTwo, cellThree, cellFour, cellFive, cellSix];
let playerCells2 = [cellSeven, cellEight, cellNine, cellTen, cellEleven, cellTwelve];
let currentPlayerCells = currentPlayer === 1 ? playerCells1 : playerCells2;
let opponentCells = opponent === 1 ? playerCells1 : playerCells2;

let lastCell;

// Function to initialise the game with 4 in each cell.
const initialiseGame = () => {
    turnParagraph.innerText = `It is player ${currentPlayer} turn.`;
    cells.forEach((cell) => { 
        cell.value = 4;
        cell.innerText = cell.value;
    })
    playerBoardOne.value = 0;
    playerBoardTwo.value = 0;
    playerBoardOne.innerText = playerBoardOne.value;
    playerBoardTwo.innerText = playerBoardTwo.value;
}

// call the function to initialise the game.
initialiseGame(); 

// Check the value of the cell.
const getValueFromCell = (event) => {
    return event.target.value;
}    

// distribute the cell value one by one to the next cells.
const distributeToNext = (cell) => {
    let nextCell = cell.nextElementSibling;

    for (let cellValueStart = cell.value; cell.value > 0; cell.value--) {
        cell.innerText = cell.value;

        if(!cell.nextElementSibling && cell.value == cellValueStart) { // if the cell doesn't have a next sibling, the default next cell is cellOne (the first cell in the table).
            nextCell = cellOne;
        } else if(cell.nextElementSibling && cell.value == cellValueStart) { // it if does, the next cell is the next sibling.
            nextCell = cell.nextElementSibling;
        } 

        nextCell.value++;
        nextCell.innerText = nextCell.value;

        if (cell.value !== 1) {
            if(!nextCell.nextElementSibling) { // change the next cell to be the cell after this next one.
                nextCell = cellOne; // if it doesn't have a sibling, the default next cell is cellOne.
            } else if (nextCell.nextElementSibling == cell) {
                nextCell = cell.nextElementSibling;
            } else {
                nextCell = nextCell.nextElementSibling; // it it does, the next cell is the next sibling.
            }
        } else {
            lastCell = nextCell;
            return lastCell;
        }
    }
}

// verify if the value of the cell is equal to 2 or 3
const isSeedsEqualToTwoOrThree = (cell) => {
    return cell.value == 2 || cell.value == 3
}

// collect of the seeds
const collectSeeds = (lastCell) => {
    while (isSeedsEqualToTwoOrThree(lastCell)) {    // call the verifying function. If true :
        playerBoard.value += lastCell.value;        // add the value to the playerBoard
        playerBoard.innerText = playerBoard.value;    
        lastCell.value = 0;                         // put the value of the cell back to 0
        lastCell.innerText = lastCell.value;
        lastCell = lastCell.previousElementSibling; // check the previous cell 
    }                                               // while there are 2 or 3 seeds, there are collected. If not, the function stops.
}

// Manage the players turns
const newTurn = () => {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    opponent = opponent === 1 ? 2 : 1;
    turnParagraph.innerText = `It is player ${currentPlayer} turn.`;
    playerBoard = document.getElementById(`player-board-${currentPlayer}`);
    currentPlayerCells = currentPlayer === 1 ? playerCells1 : playerCells2;
    opponentCells = opponent === 1 ? playerCells1 : playerCells2;
    currentPlayerCells.forEach((cell) => {
        cell.classList.toggle("avoid-clicks");
    })
    opponentCells.forEach((cell) => {
        cell.classList.toggle("avoid-clicks");
    })
    return currentPlayer;
}

// click EventListener on the cell when the user plays.
cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
        distributeToNext(cell);
        collectSeeds(lastCell);
        newTurn();
    })
})