import { Component } from '@angular/core';
import { Board } from './game/board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minesweeper';
  board = new Board(5, 5);
}
