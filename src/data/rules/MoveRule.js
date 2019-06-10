
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
        action.piece.tile = to;

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
                    tile: currentTile,
                    action: false
                };
                currentTile.actions.push(attackAction);
                piece.actions.push(attackAction);

                if (currentTile.piece && currentTile.piece.player === piece.player) break;

                let moveAction = {
                    type: 'MOVE_PIECE',
                    piece: piece,
                    tile: currentTile,
                    action: true
                };

                currentTile.actions.push(moveAction);
                piece.actions.push(moveAction);

                if (!this.repeat) { break; }
                if (currentTile.piece && currentTile.piece.player !== piece.player) {
                    x += move.x;
                    y += move.y;
                    currentTile = state.board.getTile(x, y);

                    // Once we've calculated what tiles a piece is attacking, and the available moves
                    // we run the calculations further to see what pieces the tile *would* attack
                    // if an attacked piece moved out of the way (used in check calculations)
                    while (currentTile !== null) {
                        if (currentTile.piece && currentTile.piece.player === piece.player) break;

                        let pinnedAction = {
                            type: 'ATTACK_PINNED',
                            piece: piece,
                            tile: currentTile,
                            action: false
                        };
                        currentTile.actions.push(pinnedAction);
                        piece.actions.push(pinnedAction);

                        if (currentTile.piece && currentTile.piece.player !== piece.player) break;

                        x += move.x;
                        y += move.y;
                        currentTile = state.board.getTile(x, y);
                    }
                    break;
                }

                x += move.x;
                y += move.y;
                currentTile = state.board.getTile(x, y);
            }
        });
    }
}

export { MoveRule };