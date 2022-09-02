import { Component } from '@angular/core';
import { Board } from './game/board';
import { Cell } from "./game/cell";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minesweeper';
  board = new Board(10, 10);

  checkCell(cell: Cell){
    const result =  this.board.checkCell(cell)
    if(result === 'Game Over!'){
      alert('You lose! :(')
    }
    else if( result === 'Win!'){
      alert('You win the game :)')
    }
  }

  flag(cell: Cell){
    if(cell.status === 'flag'){
      cell.status = 'open'
    }
    else{
      cell.status = 'flag'
    }
  }

  reset(){
    this.board = new Board(10,5)
  }
}
