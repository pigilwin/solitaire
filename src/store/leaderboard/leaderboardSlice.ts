import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deepCopy } from "../util";
import { CompletedGame, LeaderboardState } from "./types";

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
        }
    }
});

export const reducer = leaderboardSlice.reducer;
export const {
    loadGamesAction,
    addGameAction
} = leaderboardSlice.actions;