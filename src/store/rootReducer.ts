import { combineReducers } from '@reduxjs/toolkit';

import { reducer as gameReducer } from './game/gameSlice';
import { reducer as gamesReducer } from './game/gamesSlice';


export const rootReducer = combineReducers({
    gameReducer,
    gamesReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;