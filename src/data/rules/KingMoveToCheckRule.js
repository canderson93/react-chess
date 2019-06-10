import {GameRule} from './GameRule';

/**
 * Prevent a king from moving into check
 */
class KingMoveToCheckRule extends GameRule {

    static beforeMove(state) {
        const tiles = state.board.getAllPiecesOfType('king');
        tiles.forEach(this.pruneMoves.bind(this, state));

        return state;
    }

    static pruneMoves(state, tile) {
        tile.piece.actions = tile.piece.actions.filter(action => {
            if (action.type !== 'MOVE_PIECE') return true;

            let allowedAction = true;
            action.tile.actions.forEach((action) => {
                if (action.type === 'ATTACK_PIECE' && action.piece.player !== tile.piece.player) {
                    allowedAction = false;
                }
            });

            if (!allowedAction) {
                let actionIndex = action.tile.actions.indexOf(action);
                action.tile.actions.splice(actionIndex, 1);
            }

            return allowedAction;
        });
    }
}

export default KingMoveToCheckRule;