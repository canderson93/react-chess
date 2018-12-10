import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    /* Set up the inital board state -- B / W for Black and White
     * K = King, Q = Queen, B = Bishop, N = Knight, R = Rook, P = Pawn
     */
    let board = `
    BR,BN,BB,BQ,BK,BB,BN,BR;
    BP,BP,BP,BP,BP,BP,BP,BP;
    ,,,,,,,;
    ,,,,,,,;
    ,,,,,,,;
    ,,,,,,,;
    WP,WP,WP,WP,WP,WP,WP,WP;
    WR,WN,WB,WQ,WK,WB,WN,WR;
    `;

    this.state = {board: this.parseBoard(board)}
  }

  parseBoard(board) {
    let parsedBoard = [];

    let rows = board.split(';');
    rows.splice(rows.length-1, 1); //the final ; creates an off-by-one error, so remove the last element

    //Split the rows, and trim the results
    rows.forEach(function(row) {
      let tiles = row.split(',');
      tiles = tiles.map((tile) => tile.trim());

      parsedBoard.push(tiles)
    });

    return parsedBoard;
  }

  render() {
    return (
      <div className="App">
          <Board board={this.state.board} />
      </div>
    );
  }
}

export default App;
