
import { MoveRule } from './MoveRule';

class MoveRookRule extends MoveRule {
    static allowedMoves = [
        {x: 0, y: 1},
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: -1, y: 0},
    ];
    static type = 'rook';
    static repeat = true;
}

export default MoveRookRule;