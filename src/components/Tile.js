import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChessKing, faChessRook, faChessBishop, faChessKnight, faChessPawn, faChessQueen } from '@fortawesome/free-solid-svg-icons';

import '../styles/Piece.css';

library.add(faChessKing, faChessRook, faChessBishop, faChessKnight, faChessPawn, faChessQueen);

class Tile extends Component {

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
      let piece = this.props.tile.piece;
      let player = piece ? piece.player : '';

      return player && piece ? {player, piece: piece.type} : null;
  }

    /**
     * Check whether this tile is the target of an action from the selected piece
     * @returns {boolean}
     */
  isLegal() {
      if (!this.props.selectedTile || !this.props.selectedTile.piece) { return false; }
      let piece = this.props.selectedTile.piece;
      let legal = false;

        // Filter out actions on this tile that don't involve the correct piece
        let actions = piece.actions.filter(action => {
            return action.tile === this.props.tile && action.action === true
        });

        actions.forEach((action) => {
            if (action.tile.x === this.props.tile.x && action.tile.y === this.props.tile.y) {
                legal = true;
            }
        });

        return legal;
  }

  handleClick() {
      let selectedTile = this.props.selectedTile;
      if (selectedTile
          && selectedTile.piece
          && selectedTile.piece.player === this.props.player) {

          // Filter out actions on this tile that don't involve the correct piece
          let actions = this.props.tile.actions.filter(action => {
              return action.piece === selectedTile.piece && action.type !== 'ATTACK_PIECE'
          });

          actions.forEach((action) => {
              this.props.dispatch(action)
          });

          if (actions.length) return;
      }

      this.props.dispatch({
          type: 'SELECT_PIECE',
          tile: this.props.tile
      })
  }

  render() {
      let legal = this.isLegal();
      let selected = false;
      if (this.props.selectedTile) {
          selected = this.props.selectedTile.x === this.props.tile.x && this.props.selectedTile.y === this.props.tile.y;
      }

      let piece = this.getPiece();
      let pieceClass = piece ? `${piece.player} ${piece.piece}` : '';

    return (
      <div id={this.props.id}
           data-x={this.props.tile.x}
           data-y={this.props.tile.y}
           className={`tile ${pieceClass} ${selected ? 'selected' : ''} ${legal ? 'legal' : ''}`}
           onClick={this.handleClick.bind(this)}>
          {piece ? (<FontAwesomeIcon icon={`chess-${piece.piece}`}/>) : ''}
      </div>
    );
  }
}

function stateMap(state) {
    return {
        player: state.player,
        selectedTile: state.selectedTile
    };
}

export default connect(stateMap)(Tile);
