import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";
import { deepCopy } from "lib/deepCopy";
import { LocationAwareSolitaireCard } from "types/game";
import { GameMove, PossibleMovesPayload } from "types/move";
import { CanCardMoveFromWorker } from "types/worker";

export const initialState: GameMove = {
    potentialMoveLocations: {},
    cardWantingToBeMoved: null
};

const gameMoveSlice = createSlice({
    name: 'game-moves',
    initialState: initialState,
    reducers: {
        updatePossibleMovesAction(state: GameMove, action: PayloadAction<PossibleMovesPayload>) {
            const newState = deepCopy<GameMove>(state);
            newState.potentialMoveLocations = action.payload.potentialMoves;
            newState.cardWantingToBeMoved = action.payload.cardWantingToBeMoved;
            return newState;
        },
        clearPossibleMovesAction(state: GameMove) {
            const newState = deepCopy<GameMove>(state);
            newState.potentialMoveLocations = {};
            return newState;
        }
    }
});

export const reducer = gameMoveSlice.reducer;
export const {
    updatePossibleMovesAction,
    clearPossibleMovesAction
} = gameMoveSlice.actions;

export const potentialMoveLocationsSelector = (state: RootState): CanCardMoveFromWorker => state.gameMoveReducer.potentialMoveLocations;
export const cardWantingToBeMovedSelector = (state: RootState): LocationAwareSolitaireCard => state.gameMoveReducer.cardWantingToBeMoved as LocationAwareSolitaireCard;