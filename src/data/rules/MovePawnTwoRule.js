import { GameRule } from './GameRule';

class MovePawnTwoRule extends GameRule {

    static atTurnStart(state) {
        const tiles = state.board.getAllPiecesOfType('pawn');
        tiles.forEach(this.markAllowedMoves.bind(this, state));

        return state;
    }

    static markAllowedMoves(state, tile) {
        const piece = tile.piece;
        const direction = piece.player === 'white' ? -1 : 1;
        const allowedRank = piece.player === 'white' ? 6 : 1;
        const {x, y} = tile;

        // Pawn is in the wrong place, so it's not eligible to move
        if (y !== allowedRank) return;

        // Check whether the pawn can move forward
        let currentTile = state.board.getTile(x, y + direction);
        if (currentTile.piece) return;

        // Now check whether the pawn can move two forward
        currentTile = state.board.getTile(x, y + (2 * direction));
        if (currentTile.piece) return;

        let moveAction = {
            type: 'MOVE_PIECE',
            piece: piece,
            tile: currentTile
        };

        currentTile.actions.push(moveAction);
        piece.actions.push(moveAction);
    }
}

export default MovePawnTwoRule;