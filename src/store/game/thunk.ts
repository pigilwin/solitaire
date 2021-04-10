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

export const initialiseGameAsync = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    dispatch(initialiseGameAction());
}



export const refreshRemaningFromDrawAsync = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(refreshRemaningFromDrawAction());
}

export const drawCardFromDeckAsync = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(drawCardFromDeckAction());
}

export const moveCardToColumnAsync = (
    payload: MoveCardPayload
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(moveCardToColumnAction(payload));
}

export const moveCardToEmptyColumnAsync = (
    payload: MoveCardToEmptyColumnPayload
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(moveCardToEmptyColumnAction(payload));
}

export const moveCardToFinalColumnAsync = (
    payload: MoveCardToFinalColumnPayload
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const game = deepCopy<Game>(fetchGame(getState));
    dispatch(moveCardToFinalColumnAction(payload));
}