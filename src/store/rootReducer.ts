import { combineReducers } from '@reduxjs/toolkit';

import { reducer as applicationReducer } from './application/applicationSlice';
import { reducer as gameReducer } from './game/gameSlice';
import { reducer as gameMoveReducer } from './game/gameMoveSlice';
import { reducer as historyReducer } from './history/historySlice';
import { reducer as leaderboardReducer } from './leaderboard/leaderboardSlice';
import { reducer as trackerReducer } from './tracker/trackerSlice';

export const rootReducer = combineReducers({
    applicationReducer,
    gameReducer,
    gameMoveReducer,
    historyReducer,
    leaderboardReducer,
    trackerReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;