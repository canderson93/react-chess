
import MoveBishopRule from './rules/MoveBishopRule';
import MoveKingRule from './rules/MoveKingRule';
import MoveKnightRule from './rules/MoveKnightRule';
import MovePawnRule from './rules/MovePawnRule';
import MovePawnTwoRule from './rules/MovePawnTwoRule';
import MoveQueenRule from './rules/MoveQueenRule';
import MoveRookRule from './rules/MoveRookRule';

import CastleRule from './rules/CastleRule';
import MustBlockCheckRule from './rules/MustBlockCheckRule';
import KingMoveToCheckRule from './rules/KingMoveToCheckRule';
import PinnedPieceCheckRule from './rules/PinnedPieceCheckRule';

import CheckmateRule from './rules/CheckmateRule';
import NoMoveStalemateRule from './rules/NoMoveStatelmateRule';

const GameRules = [
    MoveBishopRule,
    MoveKnightRule,
    MoveKingRule,
    MovePawnRule,
    MovePawnTwoRule,
    MoveQueenRule,
    MoveRookRule,
    CastleRule,
    PinnedPieceCheckRule,
    MustBlockCheckRule,
    KingMoveToCheckRule,
    CheckmateRule,
    NoMoveStalemateRule
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
    CastleRule,
    PinnedPieceCheckRule,
    MustBlockCheckRule,
    KingMoveToCheckRule,
    CheckmateRule,
    NoMoveStalemateRule
};