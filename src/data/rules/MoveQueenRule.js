
import { MoveRule } from './MoveRule';

class MoveQueenRule extends MoveRule {
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
    static type = 'queen';
    static repeat = true;
}

export default MoveQueenRule;