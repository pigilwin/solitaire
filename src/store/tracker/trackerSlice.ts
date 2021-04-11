import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { deepCopy } from "../util";
import { TrackerState } from "./types";

export const initialState: TrackerState =  {
    score: 0,
    moves: 0,
    start: 0,
    end: 0
};

const historySlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        incrementScoreAction(state: TrackerState, action: PayloadAction<number>) {
            const newState = deepCopy<TrackerState>(state);
            newState.score += action.payload;
            return newState;
        },
        startAction(state: TrackerState) {
            const newState = deepCopy<TrackerState>(state);
            newState.start = Date.now();
            return newState;
        },
        endAction(state: TrackerState) {
            const newState = deepCopy<TrackerState>(state);
            newState.end = Date.now();
            return newState;
        },
        addMoveAction(state: TrackerState) {
            const newState = deepCopy<TrackerState>(state);
            newState.moves += 1;
            return newState;
        }
    }
});

export const reducer = historySlice.reducer;
export const {
    incrementScoreAction,
    startAction,
    endAction,
    addMoveAction
} = historySlice.actions;

export const currentMovesSelector = (state: RootState): number => state.trackerReducer.moves;
export const currentScoreSelector = (state: RootState): number => state.trackerReducer.score;