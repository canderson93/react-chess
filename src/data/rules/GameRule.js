
class GameRule {

    /**
     * Hook to apply this rule at the start of a turn
     * Use this to mark allowed moves and attacks based on the current board state
     * @param state
     * @return new state
     */
    static atTurnStart(state) {return state;}

    /**
     * Hook to apply this rule before the current player takes a move
     * Use this to apply rules that depend on other game rules, for instance ensuring that players don't move into check
     * @param state
     * @returns new state
     */
    static beforeMove(state) {return state;}

    /**
     * Hook to check the game state for certain conditions after every other game rule has one
     * Use this to check game's condition after all other rules have run.
     *
     * This hook should not modify the game state, except to declare a winner
     *
     * @param state
     * @returns new state
     */
    static stateCheck(state) {return state;}

    /**
     * Execute moves based on this rule
     * Use this to execute board state changes
     * @param state
     * @param action
     * @return new state
     */
    static execute(state, action) {return state;}

    /**
     * Hook to apply this rule after the current player takes a move
     * Use this hook to perform actions based on the previous move to update the game state for the next turn
     * e.g. pawn promotion
     * @param state
     * @returns {*}
     */
    static afterMove(state) {return state;}

}

export {
    GameRule
}