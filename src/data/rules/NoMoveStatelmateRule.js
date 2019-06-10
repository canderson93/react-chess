
import { GameRule } from './GameRule';

class NoMoveStatelmateRule extends GameRule {

    static stateCheck(state) {
        const tiles = state.board.getAllPiecesOfType('king');
        tiles.forEach(this.checkForWinner.bind(this, state));

        return state;
    }

    static checkForWinner(state, tile) {
        const player = tile.piece.player;

        // Check that the king is actively in check, otherwise bail
        let inCheck = this.getAttackingPieces(tile, player).length;
        if (inCheck) { return state; }

        // If there are no moves that would get the player out of check, the player is in checkmate
        let pieces = state.board.getPlayerPieces(player).map(piece => piece.piece);
        let stalemate = true;

        pieces.forEach(piece => {
            let moveActions = piece.actions.filter(action => action.type === 'MOVE_PIECE');
            if (moveActions.length) stalemate = false;
        });

        if (stalemate) {
            state.winner = true;
            state.message = "The game was a draw";
        }
    }

    static getAttackingPieces(tile, player) {
        return tile.actions.filter(action => {
            return action.type === 'ATTACK_PIECE' && action.piece.player !== tile.piece.player
        })
    }
}

export default NoMoveStatelmateRule;