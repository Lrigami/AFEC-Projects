let cells = document.querySelectorAll("td"); // get all cells
let cellOne = document.getElementById("cell1");
let cellTwelve = document.getElementById("cell12");

const initialiseGame = () => { // initialisation to 4 in each cell (start)
  cells.forEach((cell) => { 
    cell.value = 4;
    cell.innerText = cell.value;
  })
}
initialiseGame();

const getValueFromCell = (event) => {
    return event.target.value;
}    

const isValueUnderTwelve = (event) => {
    if (getValueFromCell(event) <= 11) {
        return true;
    } else {
        return false;
    }
}

const distributeValue = (cell) => {

    if (isValueUnderTwelve(event)) {
        distributeToNext(cell);
    } else {
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
        distributeToPrevious(cell);
    }
}

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

cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
        distributeValue(cell);
    })
})