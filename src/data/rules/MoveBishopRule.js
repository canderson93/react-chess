
import { MoveRule } from './MoveRule';

class MoveBishopRule extends MoveRule {
    static allowedMoves = [
        {x: 1, y: 1},
        {x: 1, y: -1},
        {x: -1, y: 1},
        {x: -1, y: -1}
    ];
    static type = 'bishop';
    static repeat = true;
}

export default MoveBishopRule;