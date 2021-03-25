import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { generateGame } from './game';
import { Game, Solitaire } from './suitTypes';

export const initialState: Game =  {
    game: {
        id: '',
        score: 0,
        start: Date.now(),
        end: Date.now(),
        first: [],
        second: [],
        third: [],
        fourth: [],
        five: [],
        sixth: [],
        seventh: [],
        heart: [],
        diamond: [],
        spade: [],
        club: [],
        draw: []
    }
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initialiseGame(state) {
            const newGame = state;
            newGame.game = generateGame();
            return newGame;
        }
    }
});

export const reducer = gameSlice.reducer;
export const {
    initialiseGame
} = gameSlice.actions;

export const currentGameSelector = (state: RootState): Solitaire => state.gameReducer.game;