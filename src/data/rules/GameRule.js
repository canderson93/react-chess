
class GameRule {

    /**
     * Hook to apply this rule at the start of a turn
     * Use this to check for state-based actions, such as stalemate, or checkmate and marking allowed
     * moves and attacks based on the current board state
     * @param state
     * @return new state
     */
    static atTurnStart(state) {return state;}

    /**
     * Hook to apply this rule before the current player takes a move
     * Use this to apply rules that depend on other game rules, for instance checking that players have a valid move
     * @param state
     * @returns new state
     */
    static beforeMove(state) {return state;}

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
     * Use this to check for illegal board states
     * @param state
     * @returns {*}
     */
    static afterMove(state) {return state;}

}

export {
    GameRule
}