// const declarations.
const cells = document.querySelectorAll("td");
const cellOne = document.getElementById("cell1");
const cellTwelve = document.getElementById("cell12");

// Function to initialise the game with 4 in each cell.
const initialiseGame = () => {
  cells.forEach((cell) => { 
    cell.value = 4;
    cell.innerText = cell.value;
  })
}

// call the function to initialise the game.
initialiseGame(); 

// Check the value of the cell
const getValueFromCell = (event) => {
    return event.target.value;
}    

// Return if the value is under twelve.
const isValueUnderTwelve = (event) => {
    if (getValueFromCell(event) <= 11) {
        return true;
    } else {
        return false;
    }
}

// distribute the cell value one by one to the next cells.
const distributeToNext = (cell) => {
    let nextCell = cell.nextElementSibling;
    let cellValueStart = cell.value;

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

        if(!nextCell.nextElementSibling) { // change the next cell to be the cell after this next one.
            nextCell = cellOne; // if it doesn't have a sibling, the default next cell is cellOne.
        } else {
            nextCell = nextCell.nextElementSibling; // it it does, the next cell is the next sibling.
        }
    }
}

// Function to distribute the value until eleven (for the case when the cell value is sup to 12).
// Does the same thing as the function distributeToNext(), but stop at 11 so the selected cell does not feed itself.
const distributeUntilEleven = (cell) => {
    let nextCell = cell.nextElementSibling;

    for (let i = 11; i > 0; i--) {
        cell.value--;
        cell.innerText = cell.value;

        if(!cell.nextElementSibling && i == 11) {
            nextCell = cellOne;
        } else if(cell.nextElementSibling && i == 11) {
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

// distribute the value depending on the case (call the right functions).
const distributeValue = (cell) => {
    if (isValueUnderTwelve(event)) {
        distributeToNext(cell);
    } else {
        distributeUntilEleven(cell);
        distributeToNext(cell);
    }
}

// click EventListener on the cell when the user plays.
cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
        distributeValue(cell);
    })
})