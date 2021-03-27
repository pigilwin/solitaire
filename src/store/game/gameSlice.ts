import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { deepCopy } from '../util';
import { drawCardFromRemainingAddToDraw } from './gameBuilder';
import { generateGame } from './initialiseGame';
import { Game, Solitaire } from './suitTypes';

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
        initialiseGame(state) {
            const newState = state;
            newState.game = generateGame();
            return newState;
        },
        drawCardFromDeck(state) {
            const newState = deepCopy<Game>(state);
            newState.game = drawCardFromRemainingAddToDraw(newState.game);
            return newState;
        }
    }
});

export const reducer = gameSlice.reducer;
export const {
    initialiseGame,
    drawCardFromDeck
} = gameSlice.actions;

export const currentGameSelector = (state: RootState): Solitaire => state.gameReducer.game;