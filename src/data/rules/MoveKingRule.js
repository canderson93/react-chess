
import { MoveRule } from './MoveRule';

class MoveKingRule extends MoveRule {
    static allowedMoves = [
        {x: 0, y: 1},
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: -1},
        {x: -1, y: 0},
        {x: -1, y: 1},
        {x: -1, y: -1}
    ];
    static type = 'king';
    static repeat = false;
}

export default MoveKingRule;