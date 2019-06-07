
import { MoveRule } from './MoveRule';

class MoveKnightRule extends MoveRule {
    static allowedMoves = [
        {x: 1, y: 2},
        {x: 1, y: -2},
        {x: -1, y: 2},
        {x: -1, y: -2},
        {x: 2, y: 1},
        {x: 2, y: -1},
        {x: -2, y: 1},
        {x: -2, y: -1}
    ];
    static type = 'knight';
    static repeat = false;
}

export default MoveKnightRule;