import {GameRule} from './GameRule';

/**
 * Stop a player from moving a piece that would put the king in check
 */
class PinnedPieceCheckRule extends GameRule {

    static beforeMove(state) {
        const tiles = state.board.getAllPiecesOfType('king');
        tiles.forEach(this.pruneMoves.bind(this, state));

        return state;
    }

    static pruneMoves(state, tile) {
        let pinnedActions = tile.actions.filter(action => action.type === 'ATTACK_PINNED');
        pinnedActions.forEach(action => {
            let attackTiles = state.board.getTilesBetween(action.piece.tile, tile);

            // Search for the piece in the attackTiles that is being pinned
            let pinnedPiece = null;
            attackTiles.forEach(piece => {
                if (!piece.piece) return;
                if (!piece.piece.player === tile.piece.player) return;
                if (piece.x === tile.x && piece.y === tile.y) return; //exclude the current piece

                pinnedPiece = piece.piece;
            });

            console.log(pinnedPiece);

            // Now we need to filter the pinned piece's actions to the intersect of the attackTiles and it's own moves
            pinnedPiece.actions = pinnedPiece.actions
                .filter(action => action.type === 'MOVE_PIECE')
                .filter(action => {
                    console.log(action);
                    let allowedAction = false;
                    attackTiles.forEach((attackTile) => {
                        if (attackTile.x === action.tile.x && attackTile.y === action.tile.y) {
                            console.log(action, attackTile);
                            allowedAction = true;
                        }
                    });

                    if (!allowedAction) {
                        console.log(action);
                        let actionIndex = action.tile.actions.indexOf(action);
                        action.tile.actions.splice(actionIndex, 1);
                        console.log(action.tile.actions);
                    }

                    return allowedAction;
                });
        });
    }
}

export default PinnedPieceCheckRule;