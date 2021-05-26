import { AppDispatch, AppThunk } from "..";
import { RootStateHook } from "../rootReducer";
import { deepCopy } from "lib/deepCopy";
import { Game } from "types/game";
import { 
    fetchGame,
    drawCardFromDeckAction, 
    moveCardToColumnAction, 
    refreshRemaningFromDrawAction, 
    moveCardToEmptyColumnAction,
    moveCardToFinalColumnAction,
    initialiseGameAction
} from "./gameSlice";
import { addGameToHistoryAction, clearHistoryAction, addScoreToHistoryAction } from "../history/historySlice";
import { addMoveAction, decrementScoreAction, fetchTracker, incrementScoreAction, clearTrackerAction } from "../tracker/trackerSlice";
import { ADD_TO_FINAL, FROM_DRAW, FROM_DRAW_WITH_EMPTY_KING, LOSS_FOR_DRAW_RESET, REMOVE_FROM_FINAL } from "../tracker/scoreConstants";
import { TrackerState } from "types/tracker";
import { MoveCardPayload, MoveCardToEmptyColumnPayload, MoveCardToFinalColumnPayload } from "types/gamePayload";
import { enhanceCard } from "lib/enhancers/enhancers";

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

    /**
     * Initialise the current tracker
     */
    dispatch(clearTrackerAction());
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
     * Add the current score to the history
     */
    const tracker = deepCopy<TrackerState>(fetchTracker(getState));
    dispatch(addScoreToHistoryAction(tracker.score));

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
     * Add the current score to the history
     */
    const tracker = deepCopy<TrackerState>(fetchTracker(getState));
    dispatch(addScoreToHistoryAction(tracker.score));

    /**
     * Add a move to the tracker
     */
     dispatch(addMoveAction());

    /**
     * Move a card from the columns
     */
    dispatch(moveCardToColumnAction(payload));

    const enhancedDrop = enhanceCard(payload.drop);
    const enhancedDrag = enhanceCard(payload.drag);

    /**
     * If the cards are being dragged between the two 
     * columns the incrementing the score is not required
     */
    if (enhancedDrag.isOnColumns() && enhancedDrop.isOnColumns()) {
        return;
    }

    /**
     * If the cards are being dragged from the draw 
     * to the board then increment the score
     */
    if (enhancedDrag.isOnDraw() && enhancedDrop.isOnColumns()) {
        dispatch(incrementScoreAction(FROM_DRAW));
        return;
    }

    /**
     * If the card is being moved back from the final location
     * to the columns then the score will need to be decremented
     */
    if (enhancedDrag.isOnFinal() && enhancedDrop.isOnColumns()) {
        dispatch(decrementScoreAction(REMOVE_FROM_FINAL));
        return;
    }
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
     * Add the current score to the history
     */
    const tracker = deepCopy<TrackerState>(fetchTracker(getState));
    dispatch(addScoreToHistoryAction(tracker.score));

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
    if (enhanceCard(payload.drag).isOnDraw()) {
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
     * Add the current score to the history
     */
    const tracker = deepCopy<TrackerState>(fetchTracker(getState));
    dispatch(addScoreToHistoryAction(tracker.score));

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