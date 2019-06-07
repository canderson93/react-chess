
import MoveBishopRule from './rules/MoveBishopRule';
import MoveKingRule from './rules/MoveKingRule';
import MoveKnightRule from './rules/MoveKnightRule';
import MovePawnRule from './rules/MovePawnRule';
import MovePawnTwoRule from './rules/MovePawnTwoRule';
import MoveQueenRule from './rules/MoveQueenRule';
import MoveRookRule from './rules/MoveRookRule';

import CastleRule from './rules/CastleRule';

const GameRules = [
    MoveBishopRule,
    MoveKnightRule,
    MoveKingRule,
    MovePawnRule,
    MovePawnTwoRule,
    MoveQueenRule,
    MoveRookRule,
    CastleRule
];

export {
    GameRules,
    MoveBishopRule,
    MoveKnightRule,
    MoveKingRule,
    MovePawnRule,
    MovePawnTwoRule,
    MoveQueenRule,
    MoveRookRule,
    CastleRule
};