import { Cell } from "./cell";

const  NEIGHBORS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class Board {
  //instantiate 2-D array ----> [ [], [] , [] , [] ..... ]
  cells: Cell[][]= [];

  private remainingCells = 0
  private bombCount = 0

  constructor(size: number, mines: number){
    for(let y= 0; y < size; y++){
      this.cells[y] = []
      for( let x = 0; x < size; x++ ){
        this.cells[y][x] = new Cell(y,x)
      }
    }

    // randomly assign the mines
    for(let j = 0; j < mines; j++){
      this.getRandomCell().mine = true
    }

    // count mines
    for(let y = 0; y < size; y++){
      for( let x = 0; x < size; x++){
        let numberOfMines = 0
        for(let neighbor of NEIGHBORS){
          // check if mine is defined and a neighbor is a Mine
          if(this.cells[y+neighbor[0]] && this.cells[y+neighbor[0]][x+neighbor[1]] && this.cells[y+neighbor[0]][x+neighbor[1]].mine){
            numberOfMines++
          }
        }
        this.cells[y][x].proximityMines = numberOfMines;
        if (this.cells[y][x].mine) {
          this.bombCount++;
        }
      }
    }

    this.remainingCells = size * size - this.bombCount;
  }

  getRandomCell(): Cell {
    const y = Math.floor(Math.random() * this.cells.length)
    const x = Math.floor(Math.random() * this.cells[y].length)
    return this.cells[y][x]
  }


  checkCell(cell: Cell): 'Game Over!' | 'Win!' | null{
    // if the cell has not been opened
    if(cell.status !== "open"){
      return null;
    }

    // if the cell is a mine
    else if(cell.mine){
      this.revealAll()
      return 'Game Over!'
    }

    else{
      cell.status = 'clear'

      //handle if there are no proximity mines around a cell
      if(cell.proximityMines === 0) {
        for(const neighbor of NEIGHBORS) {
          if (
            this.cells[cell.row + neighbor[0]] &&
            this.cells[cell.row + neighbor[0]][cell.column + neighbor[1]]
          ) {
            this.checkCell(this.cells[cell.row + neighbor[0]][cell.column + neighbor[1]]);
          }
        }
      }

      if(this.remainingCells-- <= 1){
        return 'Win!'
      }
      return null
    }

  }

  revealAll(){
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.status === 'open') {
          cell.status = 'clear';
        }
      }
    }
  }
}
