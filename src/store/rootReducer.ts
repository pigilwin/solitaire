import { combineReducers } from '@reduxjs/toolkit';

import { reducer as applicationReducer } from './application/applicationSlice';
import { reducer as gameReducer } from './game/gameSlice';
import { reducer as historyReducer } from './history/historySlice';
import { reducer as trackerReducer } from './tracker/trackerSlice';

export const rootReducer = combineReducers({
    applicationReducer,
    gameReducer,
    historyReducer,
    trackerReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;