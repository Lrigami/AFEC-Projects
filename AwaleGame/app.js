let cells = document.querySelectorAll("td"); // get all cells
let cellOne = document.getElementById("cell1");
let cellSix = document.getElementById("cell6");
let cellSeven = document.getElementById("cell7");
let cellTwelve = document.getElementById("cell12");

const initialiseGame = () => { // initialisation to 4 in each cell (start)
  cells.forEach((cell) => { 
    cell.value = 4;
    cell.innerText = cell.value;
  })
}
initialiseGame();

const distributeValue = () => { // distribute the value of the selected cell to the next ones (1 by 1)
  cells.forEach((cell) => { 
    cell.addEventListener("click", (event) => { // find the selected cell
      const targetCell = event.target.id;
      
      let nextCell = cell.nextElementSibling;
      let count = 0;
      
      while (cell.value > 0) {
          cell.value--;
        
          if (cell.id == "cell6" && count == 0 ) {
            nextCell = cellSeven;
          } else if (cell.id == "cell12" && count == 0) {
            nextCell = cellOne;
          }
        
          nextCell.value++;
          cell.innerText = cell.value;
          nextCell.innerText = nextCell.value;
          count++;

          if (count <= 11) {
            if (nextCell.id == "cell6") {
              nextCell = cellSeven;
            } else if (nextCell.id == "cell12") {
              nextCell = cellOne;
            } else {
              nextCell = nextCell.nextElementSibling;
            }
          } else {
            cell.value--;
            nextCell.value++;
            cell.innerText = cell.value;
            nextCell.innerText = nextCell.value;
            count++;
            console.log(cell.value);
          }
        }
    });         
  });
}

distributeValue();