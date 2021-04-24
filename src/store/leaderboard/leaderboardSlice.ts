import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        }
    }
});

export const reducer = leaderboardSlice.reducer;
export const {
    loadGamesAction
} = leaderboardSlice.actions;