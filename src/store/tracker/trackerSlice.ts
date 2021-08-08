import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackerState } from "types/tracker";
import { RootState, RootStateHook } from "../rootReducer";
import { deepCopy } from "lib/deepCopy";

export const initialState: TrackerState =  {
    score: 0,
    moves: 0
};

const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        clearTrackerAction() {
            return initialState;
        },
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
        addMoveAction(state: TrackerState) {
            const newState = deepCopy<TrackerState>(state);
            newState.moves += 1;
            return newState;
        },
        replaceScoreAction(state: TrackerState, action: PayloadAction<number>) {
            const newState = deepCopy<TrackerState>(state);
            newState.score = action.payload;
            return newState;
        }
    }
});

export const reducer = trackerSlice.reducer;
export const {
    incrementScoreAction,
    decrementScoreAction,
    addMoveAction,
    clearTrackerAction,
    replaceScoreAction
} = trackerSlice.actions;

export const fetchTracker = (state: RootStateHook): TrackerState => {
    const tracker = state().trackerReducer;
    return {...tracker};
}

export const currentMovesSelector = (state: RootState): number => state.trackerReducer.moves;
export const currentScoreSelector = (state: RootState): number => state.trackerReducer.score;