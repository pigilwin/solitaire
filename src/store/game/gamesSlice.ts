import { createSlice } from '@reduxjs/toolkit';

export const initialState =  {

};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {}
});

export const reducer = gamesSlice.reducer;