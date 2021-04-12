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
import { addHistoryItemAction, clearHistoryAction } from "../history/historySlice";
import { addMoveAction, clearTrackerAction } from "../tracker/trackerSlice";

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
    dispatch(addHistoryItemAction(game));

    /**
     * Add a move to the tracker
     */
    dispatch(addMoveAction());

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
    dispatch(addHistoryItemAction(game));

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
    dispatch(addHistoryItemAction(game));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Move a card from the columns
     */
    dispatch(moveCardToColumnAction(payload));
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
    dispatch(addHistoryItemAction(game));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Move a card to a empty column
     */
    dispatch(moveCardToEmptyColumnAction(payload));
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
    dispatch(addHistoryItemAction(game));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Move the card up to the final column
     */
    dispatch(moveCardToFinalColumnAction(payload));
}