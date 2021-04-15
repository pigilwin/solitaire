import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../game/types/game";
import { RootState, RootStateHook } from "../rootReducer";
import { deepCopy } from "../util";
import { HistoryState } from "./type";

export const initialState: HistoryState =  {
    games: [],
    score: []
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        clearHistoryAction(state: HistoryState) {
            const newState = deepCopy<HistoryState>(state);
            newState.games = [];
            newState.score = [];
            return newState;
        },
        addGameToHistoryAction(state: HistoryState, action: PayloadAction<Game>) {
            const newState = deepCopy<HistoryState>(state);
            newState.games.push(action.payload);
            return newState;
        },
        addScoreToHistoryAction(state: HistoryState, action: PayloadAction<number>) {
            const newState = deepCopy<HistoryState>(state);
            newState.score.push(action.payload);
            return newState;
        },
        removeLatestHistoryItemAction(state: HistoryState) {
            const newState = deepCopy<HistoryState>(state);
            newState.games.splice(newState.games.length - 1);
            return newState;
        }
    }
});

export const reducer = historySlice.reducer;
export const {
    clearHistoryAction,
    addGameToHistoryAction,
    addScoreToHistoryAction,
    removeLatestHistoryItemAction
} = historySlice.actions;

export const doWeHaveAnyHistorySelector = (state: RootState): boolean => state.historyReducer.games.length > 0;
export const latestHistoryItemSelector = (state: RootState): Game => state.historyReducer.games[state.historyReducer.games.length - 1];