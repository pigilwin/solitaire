import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { generateGame } from './game';
import { Game, Solitaire } from './suitTypes';

export const initialState: Game =  {
    game: null
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

export const currentGameSelector = (state: RootState): Solitaire | null => state.gameReducer.game;