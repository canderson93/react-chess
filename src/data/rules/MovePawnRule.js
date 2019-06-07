
import { MoveRule } from './MoveRule';

class MovePawnRule extends MoveRule {
    static type = 'pawn';
    static repeat = false;

    static markAllowedMoves(state, tile) {
        const piece = tile.piece;
        const direction = piece.player === 'white' ? -1 : 1;
        const {x, y} = tile;

        // Check whether the pawn can move forward
        let currentTile = state.board.getTile(x, y + direction);
        if (currentTile && !currentTile.piece) {
            let action = {
                type: 'MOVE_PIECE',
                piece: piece,
                tile: currentTile
            };
            currentTile.actions.push(action);
            piece.actions.push(action);
        }


        // These are the diagonal capture moves
        let diagonalCapture = [
            {x: 1, y: direction},
            {x: -1, y: direction}
        ];
        diagonalCapture.forEach(move => {
            let currentTile = state.board.getTile(x+move.x, y+move.y);

            if (currentTile !== null) {
                let attackAction = {
                    type: 'ATTACK_PIECE',
                    piece: piece,
                    tile: currentTile
                };
                currentTile.actions.push(attackAction);
                piece.actions.push(attackAction);

                if (currentTile.piece && currentTile.piece.player !== piece.player) {
                    let moveAction = {
                        type: 'MOVE_PIECE',
                        piece: piece,
                        tile: currentTile
                    };

                    currentTile.actions.push(moveAction);
                    piece.actions.push(moveAction);
                }
            }
        });
    }
}

export default MovePawnRule;