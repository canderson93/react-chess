import {GameRule} from './GameRule';

/**
 * When the king is in check, only allow moves which get the player out of check
 */
class MustBlockCheckRule extends GameRule {

    static beforeMove(state) {
        const tiles = state.board.getAllPiecesOfType('king');
        tiles.forEach(this.pruneMoves.bind(this, state));

        return state;
    }

    static pruneMoves(state, tile) {
        let attackActions = tile.actions.filter(action => {
            return action.type === 'ATTACK_PIECE' && action.piece.player !== tile.piece.player
        });

        attackActions.forEach(action => {
            let attackPiece = action.piece;
            let attackTiles = state.board.getTilesBetween(action.piece.tile, tile)
                .filter(tile => {
                    // We have to make sure that these tiles also contain attack actions to verify that the attack is
                    // blockable
                    let filterTile = action.piece.tile === attackPiece.tile;
                    tile.actions.filter(action => action.type === 'ATTACK_PIECE')
                        .forEach(action => {
                            if (action.piece === attackPiece) {
                                filterTile = true;
                            }
                        });
                    return filterTile;
                });

            // If there aren't any tiles, you can always capture the piece
            if (!attackTiles.length) attackTiles = [action.piece.tile];

            let pieces = state.board.getPlayerPieces(attackPiece.player === 'white' ? 'black' : 'white')
                .map(piece => piece.piece)
                .filter(piece => piece.type !== 'king');

            pieces.forEach(piece => {
                // Now we need to filter the pinned piece's actions to the intersect of the attackTiles and it's own moves
                piece.actions = piece.actions
                    .filter(action => action.type === 'MOVE_PIECE')
                    .filter(action => {
                        let allowedAction = false;
                        attackTiles.forEach((attackTile) => {
                            if (attackTile.x === action.tile.x && attackTile.y === action.tile.y) {
                                allowedAction = true;
                            }
                        });

                        if (!allowedAction) {
                            let actionIndex = action.tile.actions.indexOf(action);
                            action.tile.actions.splice(actionIndex, 1);
                        } else {
                            console.log(action);
                        }

                        return allowedAction;
                    });
            });
        });
    }
}

export default MustBlockCheckRule;