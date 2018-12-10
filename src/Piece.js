import React, { Component } from 'react';
import './Piece.css';

class Piece extends Component {
  constructor(props) {
    super(props);
  }

  static parsePlayer(token) {
    if (typeof(token) !== 'string' && token.length !== 2) { return null; }

    switch(token.charAt(0)) {
        case 'B':
          return 'black';
        case 'W':
          return 'white';
        default:
          return null;
    }
  }

  static parsePiece(token) {
      if (typeof(token) !== 'string' && token.length !== 2) { return null; }

      switch(token.charAt(1)) {
          case 'K':
              return 'king';
          case 'Q':
              return 'queen';
          case 'B':
              return 'bishop';
          case 'R':
              return 'rook';
          case 'N':
              return 'knight';
          case 'P':
              return 'pawn';
          default:
              return null;
      }
  }

  getPiece() {
      let player = Piece.parsePlayer(this.props.token);
      let piece = Piece.parsePiece(this.props.token);

      return player && piece ? `${player} ${piece}` : '';
  }

  render() {
    return (
      <div id={this.props.id} data-piece={this.props.token} className={`tile ${this.getPiece()} ${this.props.selected ? 'selected' : ''}`}> </div>
    );
  }
}

export default Piece;
