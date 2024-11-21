// declarations.
const cells = document.querySelectorAll("td");
const cellOne = document.getElementById("cell1");
const cellTwelve = document.getElementById("cell12");

let currentPlayer = 1;
const turnParagraph = document.getElementById("turn");
const playerBoardOne = document.getElementById("player-board-1");
const playerBoardTwo = document.getElementById("player-board-2");
let playerBoard = document.getElementById(`player-board-${currentPlayer}`);

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

// Check the value of the cell
const getValueFromCell = (event) => {
    return event.target.value;
}    

// distribute the cell value one by one to the next cells.
const distributeToNext = (cell) => {
    let nextCell = cell.nextElementSibling;
    let cellValueStart = cell.value;

    for (let i = cell.value; cell.value > 0; i--) {
        cell.value--;
        cell.innerText = cell.value;

        if(!cell.nextElementSibling && i == cellValueStart) { // if the cell doesn't have a next sibling, the default next cell is cellOne (the first cell in the table).
            nextCell = cellOne;
        } else if(cell.nextElementSibling && i == cellValueStart) { // it if does, the next cell is the next sibling.
            nextCell = cell.nextElementSibling;
        } 

        nextCell.value++;
        nextCell.innerText = nextCell.value;

        if (i !== 1) {
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

// collect of the seeds
const isSeedsEqualToTwoOrThree = (cell) => {
    if (cell.value == 2 || cell.value == 3) {
        return true;
    }
    else {
        return false;
    }
}

const collectSeeds = (lastCell) => {
    while (isSeedsEqualToTwoOrThree(lastCell)) {
        playerBoard.value += lastCell.value;
        playerBoard.innerText = playerBoard.value;    
        lastCell.value = 0;
        lastCell.innerText = lastCell.value;
        lastCell = lastCell.previousElementSibling;
    }
    return;
}

// vérifier que la valeur de la cell = 2 ou 3. si oui -> collecter + vérifier la cellule précédente, sinon stop

// Manage the players turns
const newTurn = () => {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnParagraph.innerText = `It is player ${currentPlayer} turn.`;
}

// click EventListener on the cell when the user plays.
cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
        distributeToNext(cell);
        collectSeeds(lastCell);
        newTurn();
    })
})