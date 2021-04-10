import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, Games } from "../game/types/game";
import { RootState } from "../rootReducer";
import { deepCopy } from "../util";

export const initialState: Games =  {
    games: []
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        clearHistoryAction(state: Games) {
            const newState = deepCopy<Games>(state);
            newState.games = [];
            return newState;
        },
        addHistoryItemAction(state: Games, action: PayloadAction<Game>) {
            const newState = deepCopy<Games>(state);
            newState.games.push(action.payload);
            return newState;
        },
        removeLatestHistoryItemAction(state: Games) {
            const newState = deepCopy<Games>(state);
            newState.games.splice(newState.games.length - 1);
            return newState;
        }
    }
});

export const reducer = historySlice.reducer;
export const {
    clearHistoryAction,
    addHistoryItemAction,
    removeLatestHistoryItemAction
} = historySlice.actions;

export const doWeHaveAnyHistorySelector = (state: RootState): boolean => state.historyReducer.games.length > 0;
export const latestHistoryItemSelector = (state: RootState): Game => state.historyReducer.games[state.historyReducer.games.length - 1];