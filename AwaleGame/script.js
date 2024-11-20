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
    currentCell = event.target;
    currentCellId = event.target.id;
    currentCellValue = event.target.value;
    console.log(currentCellValue);
    return currentCellValue;
}    

const isValueInfToTwleve = (event) => {
    if (getValueFromCell(event) <= 11) {
        return true;
    } else {
        return false;
    }
}

const distributeValue = (cell) => {
    let nextCell = cell.nextElementSibling;

    if (isValueInfToTwleve(event)) {
        if (currentCellId == "cell12") {
            nextCell = cellOne;
        } else {
            for (let i = currentCellValue; i > 0; i--) {
                currentCellValue--;
                currentCell.innerText = currentCellValue;

                if(!currentCell.nextElementSibling && i == currentCellValue) {
                    nextCell = cellOne;
                } else if(currentCell.nextElementSibling && i == currentCellValue) {
                    nextCell = currentCell.nextElementSibling;
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

    } else {
        if (currentCellId == "cell12") {
            nextCell = cellOne;
        } else {

        }
    }
}

cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
        distributeValue(cell);
    })
})