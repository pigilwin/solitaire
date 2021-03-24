import { combineReducers } from '@reduxjs/toolkit';

import { reducer as gameReducer } from './game/gameSlice';


export const rootReducer = combineReducers({
    gameReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;