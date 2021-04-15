import { AppDispatch, AppThunk } from "..";
import { RootStateHook } from "../rootReducer";
import { deepCopy } from "../util";
import { Game, MoveCardPayload, MoveCardToEmptyColumnPayload, MoveCardToFinalColumnPayload } from "./types/game";
import { 
    fetchGame,
    drawCardFromDeckAction, 
    moveCardToColumnAction, 
    refreshRemaningFromDrawAction, 
    moveCardToEmptyColumnAction,
    moveCardToFinalColumnAction,
    initialiseGameAction
} from "./gameSlice";
import { addGameToHistoryAction, clearHistoryAction } from "../history/historySlice";
import { addMoveAction, clearTrackerAction, decrementScoreAction, incrementScoreAction } from "../tracker/trackerSlice";
import { ADD_TO_FINAL, FROM_DRAW, FROM_DRAW_WITH_EMPTY_KING, LOSS_FOR_DRAW_RESET, REMOVE_FROM_FINAL } from "../tracker/scoreConstants";
import { isOnColumns, isOnDraw, isOnFinal } from "./locationHelper";

export const initialiseGameAsync = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    /**
     * Dispatch the clear history action
     */
    dispatch(clearHistoryAction());

    /**
     * Clear the tracker and rebuild the state
     */
    dispatch(clearTrackerAction());

    /**
     * Dispatch the new game
     */
    dispatch(initialiseGameAction());
}

export const refreshRemaningFromDrawAsync = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    
    /**
     * Add the current game to the history
     */
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(addGameToHistoryAction(game));

    /**
     * Add a move to the tracker
     */
    dispatch(addMoveAction());

    /**
     * Decrement the score
     */
    dispatch(decrementScoreAction(LOSS_FOR_DRAW_RESET));

    /**
     * Refresh the remaining draw cards within the deck
     */
    dispatch(refreshRemaningFromDrawAction());
}

export const drawCardFromDeckAsync = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    /**
     * Add the current game to the history
     */
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(addGameToHistoryAction(game));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Draw a card from the deck
     */
    dispatch(drawCardFromDeckAction());
}

export const moveCardToColumnAsync = (
    payload: MoveCardPayload
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    /**
     * Add the current game to the history
     */
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(addGameToHistoryAction(game));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Move a card from the columns
     */
    dispatch(moveCardToColumnAction(payload));

    /**
     * If the cards are being dragged between the two 
     * columns the incrementing the score is not required
     */
    if (isOnColumns(payload.drag) && isOnColumns(payload.drop)) {
        return;
    }

    /**
     * If the cards are being dragged from the draw 
     * to the board then increment the score
     */
    if (isOnDraw(payload.drag) && isOnColumns(payload.drop)) {
        dispatch(incrementScoreAction(FROM_DRAW));
        return;
    }

    /**
     * If the card is being moved back from the final location
     * to the columns then the score will need to be decremented
     */
    if (isOnFinal(payload.drag) && isOnColumns(payload.drop)) {
        dispatch(decrementScoreAction(REMOVE_FROM_FINAL));
        return;
    }

    console.log(payload);
}

export const moveCardToEmptyColumnAsync = (
    payload: MoveCardToEmptyColumnPayload
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    /**
     * Add the current game to the history
     */
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(addGameToHistoryAction(game));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Move a card to a empty column
     */
    dispatch(moveCardToEmptyColumnAction(payload));

    /**
     * If the king is being added from the 
     * drag then increment the score
     */
    if (isOnDraw(payload.drag)) {
        dispatch(incrementScoreAction(FROM_DRAW_WITH_EMPTY_KING));
        return;
    }
}

export const moveCardToFinalColumnAsync = (
    payload: MoveCardToFinalColumnPayload
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    /**
     * Add the current game to the history
     */
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(addGameToHistoryAction(game));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Increment the score
    */
    dispatch(incrementScoreAction(ADD_TO_FINAL));

    /**
     * Move the card up to the final column
     */
    dispatch(moveCardToFinalColumnAction(payload));
}