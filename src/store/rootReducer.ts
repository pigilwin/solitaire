import { combineReducers } from '@reduxjs/toolkit';

import { reducer as gameReducer } from './game/gameSlice';
import { reducer as historyReducer } from './history/historySlice';
import { reducer as trackerReducer } from './tracker/trackerSlice';

export const rootReducer = combineReducers({
    gameReducer,
    historyReducer,
    trackerReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;