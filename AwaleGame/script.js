// const 
const cells = document.querySelectorAll("td"); // get all cells
const cellOne = document.getElementById("cell1");
const cellTwelve = document.getElementById("cell12");

// Function to initialise the game with 4 in each cell
const initialiseGame = () => {
  cells.forEach((cell) => { 
    cell.value = 4;
    cell.innerText = cell.value;
  })
}

initialiseGame(); // call the function to initialise the game

// Check the value of the cell
const getValueFromCell = (event) => {
    return event.target.value;
}    

// Return if the value is under twelve
const isValueUnderTwelve = (event) => {
    if (getValueFromCell(event) <= 11) {
        return true;
    } else {
        return false;
    }
}

// Function to distribute the value until eleven (for the case when the cell value is sup to 12)
const distributeUntilEleven = (cell) => {
    let nextCell = cell.nextElementSibling;
    let cellValueStart = cell.value;

    for (let i = 11; i > 0; i--) {
        cell.value--;
        cell.innerText = cell.value;

        if(!cell.nextElementSibling && i == cellValueStart) {
            nextCell = cellOne;
        } else if(cell.nextElementSibling && i == cellValueStart) {
            nextCell = cell.nextElementSibling;
        } 

        nextCell.value++;
        nextCell.innerText = nextCell.value;

        if(!nextCell.nextElementSibling) {
            nextCell = cellOne;
        } else {
            nextCell = nextCell.nextElementSibling;
        }
    }
}

// distribute the cell value one by one to the next cells
const distributeToNext = (cell) => {
    let nextCell = cell.nextElementSibling;
    let cellValueStart = cell.value;

    for (let i = cell.value; i > 0; i--) {
        cell.value--;
        cell.innerText = cell.value;

        if(!cell.nextElementSibling && i == cellValueStart) {
            nextCell = cellOne;
        } else if(cell.nextElementSibling && i == cellValueStart) {
            nextCell = cell.nextElementSibling;
        } 

        nextCell.value++;
        nextCell.innerText = nextCell.value;

        if(!nextCell.nextElementSibling) {
            nextCell = cellOne;
        } else {
            nextCell = nextCell.nextElementSibling;
        }
    }
}

// distribute all the remainng value of the cell to the previous cell
const distributeToPrevious = (cell) => {
    let previousCell = cell.previousElementSibling;
    let cellValueStart = cell.value;

    for (let i = cell.value; i > 0; i--) {
        cell.value--;
        cell.innerText = cell.value;

        if(!cell.nextElementSibling && i == cellValueStart) {
            previousCell = cellTwelve;
        } else if(cell.nextElementSibling && i == cellValueStart) {
            previousCell = cell.previousElementSibling;
        } 

        previousCell.value++;
        previousCell.innerText = previousCell.value;
    }
}

// distribute the value depending on the case (call the right functions)
const distributeValue = (cell) => {
    if (isValueUnderTwelve(event)) {
        distributeToNext(cell);
    } else {
        distributeUntilEleven(cell);
        distributeToPrevious(cell);
    }
}

// click EventListener on the cell when the user plays
cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
        distributeValue(cell);
    })
})