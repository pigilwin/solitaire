import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { deepCopy } from "lib/deepCopy";
import { LeaderboardState, CompletedGame } from "types/leaderboard";

export const initialState: LeaderboardState =  {
    games: []
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        loadGamesAction(_, action: PayloadAction<CompletedGame[]>) {
            return {
                games: action.payload
            };
        },
        addGameAction(state: LeaderboardState, action: PayloadAction<CompletedGame>) {
            const newState = deepCopy<LeaderboardState>(state);
            newState.games.push(action.payload);
            return newState;
        },
        removeGameAction(state: LeaderboardState, action: PayloadAction<string>) {
            const newState = deepCopy<LeaderboardState>(state);
            newState.games = newState.games.filter((completedGame) => {
                return completedGame.id !== action.payload;
            });
            return newState;
        }
    }
});

export const reducer = leaderboardSlice.reducer;
export const {
    loadGamesAction,
    addGameAction,
    removeGameAction
} = leaderboardSlice.actions;

export const leaderboardSelector = (state: RootState): CompletedGame[] => {
    const games = [...state.leaderboardReducer.games];
    return games.sort((a, b) => {
        
        if (a.score > b.score) {
            return -1;
        }
        if (a.score < b.score) {
            return 1;
        }
        return 0;
    });
};