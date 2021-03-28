import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { deepCopy } from '../util';
import { drawCardFromRemainingAddToDraw, moveCard } from './gameBuilder';
import { generateGame } from './initialiseGame';
import { Game, MoveCardPayload, Solitaire } from './types/game';

export const initialState: Game =  {
    game: {
        id: '',
        score: 0,
        start: 0,
        end: 0,
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
            draw: []
        }
    }
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
        drawCardFromDeckAction(state: Game) {
            const newState = deepCopy<Game>(state);
            newState.game = drawCardFromRemainingAddToDraw(newState.game);
            return newState;
        },
        moveCardToColumnAction(state: Game, action: PayloadAction<MoveCardPayload>) {
            const newState = deepCopy<Game>(state);
            newState.game = moveCard(newState.game, action.payload);
            return newState;
        }
    }
});

export const reducer = gameSlice.reducer;
export const {
    initialiseGameAction,
    drawCardFromDeckAction,
    moveCardToColumnAction
} = gameSlice.actions;

export const currentGameSelector = (state: RootState): Solitaire => state.gameReducer.game;