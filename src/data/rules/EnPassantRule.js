
import { GameRule } from './GameRule';

class EnPassantRule extends GameRule {

    static atTurnStart(state) {
        const tiles = state.board.getAllPiecesOfType('pawn');
        tiles.forEach(this.markAllowedMoves.bind(this, state));

        return state;
    }

    static execute(state, action) {
        if (action.type !== 'EN_PASSANT') return state;

        const from = state.selectedTile;
        const to = action.tile;

        from.piece = null;
        to.piece = action.piece;
        action.piece.tile = to;

        action.passantTile.piece.tile = null;
        action.passantTile.piece = null;

        return state;
    }

    static markAllowedMoves(state, tile) {
        if (!state.history.length) return;

        const piece = tile.piece;
        const direction = piece.player === 'white' ? -1 : 1;
        const {x, y} = tile;

        // Check the last move, and if it was a pawn who moved forward two,
        // check if this pawn can attack it

        let lastMove = state.history[state.history.length - 1].to;
        debugger;
        let movedPiece = state.board.getTile(lastMove.x, lastMove.y).piece;

        console.log(lastMove);
        console.log(movedPiece);

        if (!movedPiece || movedPiece.type !== 'pawn') return;
        if (Math.abs(lastMove.from.y - lastMove.to.y) < 2) return;

        // Find the middle tile, and see if we can attack it
        let enPassantTile = state.board.getTile(lastMove.from.x, lastMove.from.y + (lastMove.to.y - lastMove.from.y)/2);

        if (Math.abs(enPassantTile.x - x) < 1 && enPassantTile.y === y + direction) {
            let enPassantAction = {
                type: 'EN_PASSANT',
                tile: enPassantTile,
                piece: piece,
                passantTile: lastMove.to
            };

            console.log(enPassantAction);
            enPassantTile.actions.push(enPassantAction);
            piece.actions.push(enPassantAction);
        }
    }
}

export default EnPassantRule;