import { createSlice } from '@reduxjs/toolkit';
import { generateGame } from './game';
import { Solitaire } from './suitTypes';

export const initialState: Solitaire =  {
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
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initialiseGame(state) {
            return generateGame();
        }
    }
});

export const reducer = gameSlice.reducer;
export const {
    initialiseGame
} = gameSlice.actions;