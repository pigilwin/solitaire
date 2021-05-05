import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../../types/game";
import { RootState } from "../rootReducer";
import { deepCopy } from "../util";
import { HistoryState } from "./type";

export const initialState: HistoryState =  {
    games: [],
    scores: []
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        clearHistoryAction() {
            return initialState;
        },
        addGameToHistoryAction(state: HistoryState, action: PayloadAction<Game>) {
            const newState = deepCopy<HistoryState>(state);
            newState.games.push(action.payload);
            return newState;
        },
        addScoreToHistoryAction(state: HistoryState, action: PayloadAction<number>) {
            const newState = deepCopy<HistoryState>(state);
            newState.scores.push(action.payload);
            return newState;
        },
        removeLatestHistoryItemAction(state: HistoryState) {
            const newState = deepCopy<HistoryState>(state);
            newState.games.splice(newState.games.length - 1);
            return newState;
        },
        removeLatestScoreAction(state: HistoryState) {
            const newState = deepCopy<HistoryState>(state);
            newState.scores.splice(newState.scores.length - 1);
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
export const latestHistoryGameSelector = (state: RootState): Game => state.historyReducer.games[state.historyReducer.games.length - 1];
export const latestHistoryScoreSelector = (state: RootState): number => state.historyReducer.scores[state.historyReducer.scores.length - 1];