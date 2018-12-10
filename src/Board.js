import React, { Component } from 'react';
import Piece from './Piece';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTile: null,
            board: props.board,
            rotate: false,
        };
    }

    drawBoard() {
        //Iterate over A->H to identify tiles (using ASCII char codes)
        let charCode = 'A'.charCodeAt(0);
        return this.state.board.map((row) => {
            let output = [];
            let counter = 0;

            let tiles = row.map((tile) => {
                let key = String.fromCharCode(charCode) + counter;
                counter += 1;

                let selected = this.state.selectedTile === key;
                return <Piece id={key} key={key} token={tile} selected={selected} />;
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

    handleClick(event) {
        let target = event.target.closest('.tile');

        if (this.state.selectedTile === null) {
            this.setState({selectedTile: target.id});
        } else if (this.state.selectedTile !== target.id) {
            let targetLocation = Board.parseRowCol(target.id);
            let selectedLocation = Board.parseRowCol(this.state.selectedTile);

            let board = this.state.board;

            if (!!board[selectedLocation.row][selectedLocation.col]) {
                board[targetLocation.row][targetLocation.col] = board[selectedLocation.row][selectedLocation.col];
                board[selectedLocation.row][selectedLocation.col] = '';

                this.setState({
                    selectedTile: null,
                    board: board,
                    rotate: !this.state.rotate,
                });
            } else {
                this.setState({
                    selectedTile: null,
                })
            }
        } else {
            this.setState({
                selectedTile: null,
            });
        }
    }

    render() {
        return (
            <div className={`board ${this.state.rotate ? 'rotate' : ''}`}
                 onClick={this.handleClick.bind(this)}>
                {this.drawBoard.apply(this)}
            </div>
        )
    }
}

export default Board;
