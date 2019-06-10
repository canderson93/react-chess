import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';
import '../styles/Board.css';

class Board extends Component {

    drawBoard() {
        //Iterate over A->H to identify tiles (using ASCII char codes)
        let charCode = 'A'.charCodeAt(0);
        return this.props.board.map((row) => {
            let output = [];
            let counter = 0;

            let tiles = row.map((tile) => {
                let key = String.fromCharCode(charCode) + counter;
                counter += 1;

                return <Tile id={key} key={key} tile={tile} />;
            });

            output.push(<div key={String.fromCharCode(charCode)} className="row">{tiles}</div>);

            charCode += 1;
            return output;
        });
    }

    static parseRowCol(token) {
        let row = token.charCodeAt(0) - 'A'.charCodeAt(0);
        let col = parseInt(token.charAt(1));

        return {row, col};
    }

    render() {
        return (
            <div className={`board ${this.props.player} ${this.props.history.length ? 'playing': ''}`}>
                {this.props.winner ? this.props.message : ''}
                {this.drawBoard.apply(this)}
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        winner: state.winner,
        message: state.message,
        player: state.player,
        selectedTile: state.selectedTile,
        board: state.board,
        history: state.history
    }
}

export default connect(mapStateToProps)(Board);