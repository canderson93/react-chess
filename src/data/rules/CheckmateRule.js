
import { GameRule } from './GameRule';

class CheckmateRule extends GameRule {

    static stateCheck(state) {
        const tiles = state.board.getAllPiecesOfType('king');
        tiles.forEach(this.checkForWinner.bind(this, state));

        return state;
    }

    static checkForWinner(state, tile) {
        const player = tile.piece.player;

        // Check that the king is actively in check, otherwise bail
        let inCheck = this.getAttackingPieces(tile, player).length;
        if (!inCheck) { return state; }

        // If there are no moves that would get the player out of check, the player is in checkmate
        let pieces = state.board.getPlayerPieces(player).map(piece => piece.piece);
        let checkmate = true;

        pieces.forEach(piece => {
            let moveActions = piece.actions.filter(action => action.type === 'MOVE_PIECE');
            if (moveActions.length) checkmate = false;
        });

        if (checkmate) {
            state.winner = true;
            state.message = "The game was won by " + (player === 'white' ? 'black' : 'white');
        }
    }

    static getAttackingPieces(tile, player) {
        return tile.actions.filter(action => {
            return action.type === 'ATTACK_PIECE' && action.piece.player !== tile.piece.player
        })
    }
}

export default CheckmateRule;