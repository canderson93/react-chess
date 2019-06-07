
import { GameRule } from './GameRule';

class CastleRule extends GameRule {

    static beforeMove(state) {
        const tiles = state.board.getAllPiecesOfType('king');
        tiles.forEach(this.markAllowedMoves.bind(this, state));

        return state;
    }

    static execute(state, action) {
        if (action.type !== 'CASTLE') return state;
        if (action.piece.type !== 'king') return state;

        const kingFrom = state.selectedTile;
        const kingTo = action.tile;

        const rookFrom = action.rook;
        const rookTo = action.rookTile;

        kingTo.piece = action.piece;
        kingFrom.piece = null;

        rookTo.piece = rookFrom.piece;
        rookFrom.piece = null;

        return state;
    }

    static markAllowedMoves(state, tile) {
        const king = tile.piece;
        const allowedRank = king.player === 'white' ? 7 : 0;

        const kingRook = state.board.getTile(7, allowedRank);
        const queenRook = state.board.getTile(0, allowedRank);

        // Check whether the king has moved
        if (this.hasMoved(state, tile)) { return; }

        // Check the kingside castle
        this.setupCastle(state, tile, kingRook, 1);
        this.setupCastle(state, tile, queenRook, -1);
    }

    static setupCastle(state, king, rook, direction) {
        // Check whether our rooks are actually rooks
        if (!rook.piece
            || rook.piece.type !== 'rook'
            || rook.piece.player !== king.piece.player) {
            return false;
        }

        let canCastle = !this.hasMoved(state, rook);
        let castleTile = state.board.getTile(king.x + 2*direction, king.y);

        // Make sure there are no pieces between the king and rook
        let castleTiles = state.board.getTilesBetween(king, rook);
        castleTiles.forEach(tile => {
            if (tile.piece && tile.piece !== king.piece && tile.piece !== rook.piece) {
                canCastle = false;
            }
        });

        // Make sure the king doesn't move through check
        castleTiles = state.board.getTilesBetween(king, castleTile);
        castleTiles.forEach(tile => {
            let actions = tile.actions.filter(action => {
                return action.type === 'ATTACK_PIECE' && action.piece.player !== king.piece.player;
            });
            if (actions.length) {
                canCastle = false;
            }
        });

        if (canCastle) {
            let action = {
                type: 'CASTLE',
                piece: king.piece,
                rook: rook,
                rookTile: state.board.getTile(king.x + direction, king.y),
                tile: castleTile
            };

            castleTile.actions.push(action);
            king.piece.actions.push(action);
        }
    }

    static hasMoved(state, tile) {
        let moved = false;
        state.history.forEach((item) => {
            // If a piece has moved to where the current piece is, it has moved before
            if (item.to.x === tile.x && item.to.y === tile.y) {
                moved = true;
            }
        });

        return moved;
    }
}

export default CastleRule;