export class Cell{
  status: 'open' | 'clear' | 'flag' = 'open';
  mine = false;
  proximityMines: number = 0


  // function to reveal a cell after user click
  constructor(public row: number, public column: number){
  //
  }

}
