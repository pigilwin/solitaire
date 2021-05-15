import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, RootStateHook } from '../rootReducer';
import { deepCopy } from '../util';
import { drawCardFromRemainingAddToDraw, refreshRemaningFromDraw , moveCard } from './builder/gameBuilder';
import { moveCardToEmptyColumn } from './builder/moveCardToEmptyColumn';
import { moveCardToFinalColumn } from './builder/moveCardToFinalColumn';
import { generateGame } from './initialiseGame';
import { Game, LocationAwareSolitaireCard, MoveCardPayload, MoveCardToEmptyColumnPayload, MoveCardToFinalColumnPayload, Solitaire } from '../../types/game';

export const initialState: Game =  {
    game: {
        id: '',
        final: {
            heart: [],
            diamond: [],
            club: [],
            spade: []
        },
        columns: {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
            seven: []
        },
        draw: {
            remaining: [],
            current: []
        }
    },
    generatedByTesting: false,
    potentialMoveLocations: []
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initialiseGameAction(state: Game) {
            const newState = state;
            newState.game = generateGame();
            return newState;
        },
        refreshRemaningFromDrawAction(state: Game) {
            const newState = deepCopy<Game>(state);
            newState.game = refreshRemaningFromDraw(newState.game);
            return newState;
        },
        drawCardFromDeckAction(state: Game) {
            const newState = deepCopy<Game>(state);
            newState.game = drawCardFromRemainingAddToDraw(newState.game);
            return newState;
        },
        moveCardToColumnAction(state: Game, action: PayloadAction<MoveCardPayload>) {
            const newState = deepCopy<Game>(state);
            newState.game = moveCard(newState.game, action.payload);
            return newState;
        },
        moveCardToEmptyColumnAction(state: Game, action: PayloadAction<MoveCardToEmptyColumnPayload>) {
            const newState = deepCopy<Game>(state);
            newState.game = moveCardToEmptyColumn(newState.game, action.payload);
            return newState;
        },
        moveCardToFinalColumnAction(state: Game, action: PayloadAction<MoveCardToFinalColumnPayload>) {
            const newState = deepCopy<Game>(state);
            newState.game = moveCardToFinalColumn(newState.game, action.payload);
            return newState;
        },
        replaceGameAction(_, action: PayloadAction<Game>) {
            return action.payload;
        },
        clearGameAction() {
            return initialState;
        },
        updatePossibleMovesAction(state: Game, action: PayloadAction<LocationAwareSolitaireCard[]>) {
            const newState = deepCopy<Game>(state);
            newState.potentialMoveLocations = action.payload;
            return newState;
        }
    }
});

export const reducer = gameSlice.reducer;
export const {
    initialiseGameAction,
    drawCardFromDeckAction,
    refreshRemaningFromDrawAction,
    moveCardToColumnAction,
    moveCardToEmptyColumnAction,
    moveCardToFinalColumnAction,
    replaceGameAction,
    clearGameAction,
    updatePossibleMovesAction
} = gameSlice.actions;

export const fetchGame = (getStateHook: RootStateHook): Game => {
    const currentGame = getStateHook().gameReducer;
    return {...currentGame};
}
export const currentGameSelector = (state: RootState): Solitaire => state.gameReducer.game;
export const potentialMoveLocationsSelector = (state: RootState): LocationAwareSolitaireCard[] => state.gameReducer.potentialMoveLocations;