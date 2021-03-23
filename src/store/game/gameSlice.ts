import { createSlice } from '@reduxjs/toolkit';

export const initialState =  {

};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {}
});

export const reducer = gameSlice.reducer;