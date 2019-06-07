import { createStore } from 'redux';

import { Board } from './board';
import { GameRules } from './rules';

const board = `
    BR,BN,BB,BQ,BK,BB,BN,BR;
    BP,BP,BP,BP,BP,BP,BP,BP;
    ,,,,,,,;
    ,,,,,,,;
    ,,,,,,,;
    ,,,,,,,;
    WP,WP,WP,WP,WP,WP,WP,WP;
    WR,WN,WB,WQ,WK,WB,WN,WR;
    `;

const defaultState = {
    winner: false,
    rejected: false,
    player: 'white',
    selectedTile: null,
    board: Board.parseBoard(board),
    history: []
};

const store = createStore(function (state = defaultState, action) {
    if (state.winner && action.type !== 'RESET_GAME') {
        return state;
    }

    let oldState = state;
    state = Object.assign({}, state);

    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'SELECT_PIECE':
            state = Object.assign(state, {
                selectedTile: action.tile
            });
            return state;
        case 'RESET_GAME':
            return defaultState;
        default:
            // Default action is to forward the action to game rules and let them
            // decide whether to act on an action
            state.board = new Board(state.board);

            // Execute the action
            GameRules.forEach(rule => state = rule.execute(state, action));
            GameRules.forEach(rule => state = rule.afterMove(state));

            // Check whether the new game state has been rejected by a game rule during the afterMove step
            // and needs to be aborted
            if (state.rejected) {
                return oldState;
            }

            if (action.tile) {
                state.history.push({
                    from: {x: state.selectedTile.x, y: state.selectedTile.y},
                    to: {x: action.tile.x, y: action.tile.y}
                });
            }

            // Start the next turn
            if (action.type.indexOf('@@redux') < 0) {
                state.player = state.player === 'white' ? 'black' : 'white';
            }
            state.board.clearState();
            state.selectedTile = null;

            GameRules.forEach(rule => state = rule.atTurnStart(state));
            GameRules.forEach(rule => state = rule.beforeMove(state));

            state.board = state.board.toStore();
            return state;
    }
});

export default store;