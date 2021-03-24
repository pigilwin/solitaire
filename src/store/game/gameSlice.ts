import { createSlice } from '@reduxjs/toolkit';
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
    seventh: []
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {}
});

export const reducer = gameSlice.reducer;