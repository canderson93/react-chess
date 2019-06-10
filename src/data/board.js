
class Board {
    board = [];

    constructor(board) {
        this.board = board;
    }

    /**
     * Gets the tile at the x, y position on the board
     * @param x
     * @param y
     * @returns {*}
     */
    getTile(x, y) {
        if (y < 0 || y >= this.board.length) { return null; }
        if (x < 0 || x >= this.board[0].length) { return null; }

        return this.board[y][x];
    }

    getTilesBetween(from, to) {
        let x = from.x;
        let y = from.y;

        let xDirection = to.x - from.x;
        let yDirection = to.y - from.y;

        // We can only move along compass points, or diagonals
        if (Math.abs(xDirection) !== Math.abs(yDirection) && xDirection !== 0 && yDirection !== 0)
            return [];


        const tiles = [];

        // Normalise the direction so it's either 0, 1 or -1
        xDirection = xDirection / Math.abs(xDirection) || xDirection;
        yDirection = yDirection / Math.abs(yDirection) || yDirection;

        while (x !== to.x || y !== to.y) {
            tiles.push(this.getTile(x, y));

            x += xDirection;
            y += yDirection;
        }

        return tiles;
    }

    getAllPieces() {
        const pieces = [];

        this.board.forEach(row => {
            row.forEach(tile => {
                if (tile.piece) {
                    pieces.push(tile);
                }
            })
        });

        return pieces;
    }

    getAllPiecesOfType(piece) {
        return this.getAllPieces().filter((tile) => tile.piece.type === piece);
    }

    getPlayerPieces(player) {
        return this.getAllPieces().filter((tile) => tile.piece.player === player);
    }

    clearState() {
        this.board.forEach(row => {
            row.forEach(tile => {
                tile.actions = [];

                if (tile.piece) {
                    tile.piece.actions = [];
                }
            })
        })
    }

    toStore() {
        return this.board;
    }

    static parseBoard(board) {
        let parsedBoard = [];

        let rows = board.split(';');
        rows.splice(rows.length - 1, 1); //the final ; creates an off-by-one error, so remove the last element

        //Split the rows, and trim the results
        rows.forEach((row, yIndex) => {
            let tiles = row.split(',');
            tiles = tiles.map((tile, xIndex) => {
                let token = tile.trim();
                let piece = null;
                if (token) {
                    piece = {
                        player: this.parsePlayer(token),
                        type: this.parsePiece(token),
                    }
                }

                let tileObject = {
                    x: xIndex,
                    y: yIndex,
                    piece: piece
                };

                // set up two-way reference between piece and tile
                if (piece) {
                    piece.tile = tileObject;
                }

                return tileObject;
            });

            parsedBoard.push(tiles)
        });

        return parsedBoard
    }


    static parsePlayer(token) {
        if (typeof(token) !== 'string' && token.length !== 2) {
            return null;
        }

        switch (token.charAt(0)) {
            case 'B':
                return 'black';
            case 'W':
                return 'white';
            default:
                return null;
        }
    }

    static parsePiece(token) {
        if (typeof(token) !== 'string' && token.length !== 2) {
            return null;
        }

        switch (token.charAt(1)) {
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
}

export {
    Board
};