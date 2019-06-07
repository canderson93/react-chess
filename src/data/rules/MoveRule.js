
import { GameRule } from './GameRule';

class MoveRule extends GameRule {
    static allowedMoves = [];
    static type = '';
    static repeat = true; // apply allowedMoves repeatedly

    static atTurnStart(state) {
        const tiles = state.board.getAllPiecesOfType(this.type);
        tiles.forEach(this.markAllowedMoves.bind(this, state));

        return state;
    }

    static execute(state, action) {
        if (action.type !== 'MOVE_PIECE') return state;
        if (action.piece.type !== this.type) return state;

        const from = state.selectedTile;
        const to = action.tile;

        from.piece = null;
        to.piece = action.piece;

        return state;
    }

    static markAllowedMoves(state, tile) {
        const piece = tile.piece;

        this.allowedMoves.forEach(move => {
            let {x, y} = tile;

            x += move.x;
            y += move.y;
            let currentTile = state.board.getTile(x, y);

            while (currentTile !== null) {
                let attackAction = {
                    type: 'ATTACK_PIECE',
                    piece: piece,
                    tile: currentTile
                };
                currentTile.actions.push(attackAction);
                piece.actions.push(attackAction);

                if (currentTile.piece && currentTile.piece.player === piece.player) break;

                let moveAction = {
                    type: 'MOVE_PIECE',
                    piece: piece,
                    tile: currentTile
                };

                currentTile.actions.push(moveAction);
                piece.actions.push(moveAction);

                if (currentTile.piece && currentTile.piece.player !== piece.player) break;
                if (!this.repeat) break;

                x += move.x;
                y += move.y;
                currentTile = state.board.getTile(x, y);
            }
        });
    }
}

export { MoveRule };