import { combineReducers } from '@reduxjs/toolkit';

import { reducer as applicationReducer } from './application/applicationSlice';
import { reducer as gameReducer } from './game/gameSlice';
import { reducer as historyReducer } from './history/historySlice';
import { reducer as leaderboardReducer } from './leaderboard/leaderboardSlice';
import { reducer as trackerReducer } from './tracker/trackerSlice';
import { reducer as movesReducer } from './moves/movesSlice';

export const rootReducer = combineReducers({
    applicationReducer,
    gameReducer,
    historyReducer,
    leaderboardReducer,
    trackerReducer,
    movesReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;