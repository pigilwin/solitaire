import { combineReducers } from '@reduxjs/toolkit';

import { reducer as gameReducer } from './game/gameSlice';
import { reducer as historyReducer } from './history/historySlice';

export const rootReducer = combineReducers({
    gameReducer,
    historyReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;