import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, RootStateHook } from "../rootReducer";
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
        decrementScoreAction(state: TrackerState, action: PayloadAction<number>) {
            const newState = deepCopy<TrackerState>(state);
            newState.score -= action.payload;
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
        },
        clearTrackerAction(state: TrackerState) {
            return initialState;
        }
    }
});

export const reducer = historySlice.reducer;
export const {
    incrementScoreAction,
    decrementScoreAction,
    startAction,
    endAction,
    addMoveAction,
    clearTrackerAction
} = historySlice.actions;

export const fetchTracker = (state: RootStateHook): TrackerState => {
    const tracker = state().trackerReducer;
    return {...tracker};
}

export const currentMovesSelector = (state: RootState): number => state.trackerReducer.moves;
export const currentScoreSelector = (state: RootState): number => state.trackerReducer.score;
export const isTheTimerActiveSelector = (state: RootState): boolean => state.trackerReducer.start > 0;