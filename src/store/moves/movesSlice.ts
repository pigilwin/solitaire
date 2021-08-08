import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { PotentialMovesFromWorker } from "types/worker";
import { MovesState } from "types/moves";

export const initialState: MovesState =  {
    moves: []
};

const movesSlice = createSlice({
    name: 'moves',
    initialState,
    reducers: {
        clearMovesAction() {
            return initialState;
        },
        applyMovesAction(state: MovesState, action: PayloadAction<PotentialMovesFromWorker>) {
            const newState = {...state};
            newState.moves = action.payload;
            return newState;
        }
    }
});

export const reducer = movesSlice.reducer;
export const {
    clearMovesAction,
    applyMovesAction
} = movesSlice.actions;

export const cardsCurrentlyHavingMovesSelector = (state: RootState): string[] => state.movesReducer.moves;