// declarations.
const boardgame = document.getElementById("game");
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

let alertP = document.getElementById("alert");
const newGame = document.getElementById("new-game");

let currentPlayer = 1;
let opponent = 2;
const turnParagraph = document.getElementById("turn");
const playerBoardOne = document.getElementById("player-board-1");
const playerBoardTwo = document.getElementById("player-board-2");
let playerBoard = document.getElementById(`player-board-${currentPlayer}`);
let opponentBoard = document.getElementById(`player-board-${opponent}`);

let playerCells1 = [cellSeven, cellEight, cellNine, cellTen, cellEleven, cellTwelve];
let playerCells2 = [cellOne, cellTwo, cellThree, cellFour, cellFive, cellSix];
let currentPlayerCells = currentPlayer === 1 ? playerCells1 : playerCells2;
let opponentCells = opponent === 1 ? playerCells1 : playerCells2;

const twoPlayers = document.getElementById("two-players");
const vsComputer = document.getElementById("against-computer");
const difficulty = document.getElementById("difficulty");



let lastCell;

// Function to initialise the game with 4 in each cell.
const initialiseGame = () => {
    newGame.style.display = "none";
    alertP.innerText  = "";
    currentPlayer = 1;
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

// Check the value of the cell.
const getValueFromCell = (event) => {
    return event.target.value;
}  

// simulate the move
const simulateMove = (selectedCell) => {
    const simulatedValues = Array.from(cells).map(cell => cell.value);  // create a copy to run the simulation
    const startIndex = Array.from(cells).indexOf(selectedCell);
    let seedsToDistribute = simulatedValues[startIndex];
    simulatedValues[startIndex] = 0;

    let currentIndex = startIndex; // simulate the seeds distribution
    while (seedsToDistribute > 0) {
        currentIndex = (currentIndex + 1) % simulatedValues.length; // go to the next cell and go back to the start if it reaches the end
        simulatedValues[currentIndex]++;
        seedsToDistribute--;
    }

    const opponentCells = currentPlayer === 1
        ? simulatedValues.slice(0, 6) // Player 1 looks at 7-12 cells
        : simulatedValues.slice(7, 12); // Player 2 looks at 1-6 cells
    return { opponentCells, simulatedValues };
}

// verify that the move is valid
const isMoveValid = (selectedCell) => {
    const { opponentCells } = simulateMove(selectedCell);
    return opponentCells.some(cellValue => cellValue > 0); // Make sure that at least one cell of the opponents cells is not empty
};


// distribute the cell value one by one to the next cells.
const distributeToNext = (cell) => {
    let nextCell = cell.nextElementSibling;
    let cellValueStart = cell.value

    for (let i = cell.value; i > 0; i--) {
        cell.value--;
        cell.innerText = cell.value;

        if(!cell.nextElementSibling && i == cellValueStart) { // if the cell doesn't have a next sibling, the default next cell is cellOne (the first cell in the table).
            nextCell = cellOne;
        } else if(cell.nextElementSibling && i == cellValueStart) { // it if does, the next cell is the next sibling.
            nextCell = cell.nextElementSibling;
        } 

        nextCell.value++;
        nextCell.innerText = nextCell.value;

        if (cell.value !== 0) {
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
    if(!opponentCells.includes(lastCell)) {
        return;
    }

    while (isSeedsEqualToTwoOrThree(lastCell) && opponentCells.includes(lastCell)) {    // call the verifying function. If true :
        playerBoard.value += lastCell.value;        // add the value to the playerBoard
        playerBoard.innerText = playerBoard.value;    
        lastCell.value = 0;                         // put the value of the cell back to 0
        lastCell.innerText = lastCell.value;
        if (!lastCell.previousElementSibling) {     // check the previous cell
            lastCell = cellTwelve;
        } else {
            lastCell = lastCell.previousElementSibling;
        } 
    }                                               // while there are 2 or 3 seeds, there are collected. If not, the function stops.
}

// Manage the players turns
const newTurn = () => {
    boardgame.style.rotate = boardgame.style.rotate === "180deg" ? "0deg" : "180deg";
    cells.forEach((cell) => {
        cell.style.rotate = boardgame.style.rotate === "180deg" ? "180deg" : "0deg" ;
    })
    playerBoardOne.style.rotate = boardgame.style.rotate === "180deg" ? "180deg" : "0deg" ;
    playerBoardTwo.style.rotate = boardgame.style.rotate === "180deg" ? "180deg" : "0deg" ;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    opponent = opponent === 1 ? 2 : 1;
    turnParagraph.innerText = `It is player ${currentPlayer} turn.`;
    playerBoard = document.getElementById(`player-board-${currentPlayer}`);
    opponentBoard = document.getElementById(`player-board-${opponent}`);
    currentPlayerCells = currentPlayer === 1 ? playerCells1 : playerCells2;
    opponentCells = opponent === 1 ? playerCells1 : playerCells2;
    alertP.innerText = "";
    return currentPlayer;
}

// check if there is any more move to play
const isThereAnyMoreMove = () => {
    let simulatedGame = [];
    currentPlayerCells.forEach((cell) => {
        if(isMoveValid(cell)) {
            simulatedGame.push(true);
        } else {
            simulatedGame.push(false);
        }
    })

    return simulatedGame.some(result => result == true);
}

const isBoardNotEmpty = () => {
    let cellValue = [];
    currentPlayerCells.forEach((cell) => {
        cellValue.push(cell.value);
    })

    return cellValue.some(result => result !== 0);
}

// put the remaining seeds in the right player board
const distributeRemainingSeeds = () => {
    playerCells1.forEach((cell) => {
        playerBoardOne.value += cell.value;
        cell.value = 0;
        cell.innerText = 0;
        playerBoardOne.innerText = playerBoardOne.value;
    });

    playerCells2.forEach((cell) => {
        playerBoardTwo.value += cell.value;
        cell.value = 0;
        cell.innerText = 0;
        playerBoardTwo.innerText = playerBoardTwo.value;
    });
}

// determine the winner 
const determineTheWinner = () => {
    if (playerBoard.value > opponentBoard.value) {
        alertP.innerText = `The winner is Player ${currentPlayer}!`
    } else if (opponentBoard.value > playerBoard.value) {
        alertP.innerText = `The winner is Player ${opponent}!`
    } else {
        alertP.innerText = "It is a draw!"
    }
}

// if players are both human 
twoPlayers.addEventListener("click", () => {
    vsComputer.style.display = "none";
    initialiseGame(); 
    cells.forEach((cell) => {
        cell.addEventListener("click", (event) => {
            play(cell);
        })
    })
});

// if one player plays against computer
vsComputer.addEventListener("click", () => {
    twoPlayers.style.display = "none";
    difficulty.style.display = "block";
    initialiseGame(); 
    let count = 0;

    function playerTurn() {
        currentPlayerCells.forEach(cell => {
            cell.onclick = () => {
                let chosenCell = cell; 
                if (!isMoveValid(chosenCell) || !currentPlayerCells.includes(chosenCell) || chosenCell.value == 0) {
                    alertP.innerText = "Please chose a valid cell.";
                    playerTurn();
                } else {
                    play(chosenCell);
                    count++;
                    setTimeout(handleTurn, 1000); 
                }
            };
        });
    }
    
    function computerTurn() {
        let chosenCell = Math.floor(Math.random() * 6);
        while (!isMoveValid(currentPlayerCells[chosenCell]) || currentPlayerCells[chosenCell].value == 0) {
            if(chosenCell == 5) {
                chosenCell = 0;
            } else {
                chosenCell++;
            }
        }
        play(currentPlayerCells[chosenCell]);
        count++;
        setTimeout(handleTurn, 1000); // Next turn
    }

    function handleTurn() {
        if (count % 2 === 0) {
            playerTurn(); // Tour du joueur
        } else {
            computerTurn(); // Tour de l'ordinateur
        }
    }

    handleTurn();
})

function play(cell) {
    if(cell.value == 0) {
        alertP.innerText = "You have to choose a cell that have seeds."
        return;
    }

    if(!currentPlayerCells.includes(cell)) {
        alertP.innerText = "Please click on one of your cells.";
        return;
    }

    if(!isMoveValid(cell)) {
        alertP.innerText = "You can't play a move that leaves no seeds in your opponent cells.";
        return;
    }

    distributeToNext(cell);
    collectSeeds(lastCell);
    newTurn();

    if(!isThereAnyMoreMove() || !isBoardNotEmpty() || playerBoard.value > 24 || opponentBoard.value > 24) {
        alertP.innerText = "It is the end of the game.";
        cells.forEach((cell) => {
            cell.classList.add("avoid-clicks");
        })
        distributeRemainingSeeds();
        determineTheWinner();
        newGame.style.display = "block";
    }
}

// Play Again
newGame.addEventListener("click", initialiseGame);