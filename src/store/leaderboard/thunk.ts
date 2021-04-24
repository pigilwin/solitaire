import { AppDispatch, AppThunk } from "..";
import { RootStateHook } from "../rootReducer";
import { LeaderboardDatabase } from "./leaderboardDatabase";
import { loadGamesAction } from "./leaderboardSlice";

export const loadLeaderboardAsync = (): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const games = await LeaderboardDatabase.read();
    dispatch(loadGamesAction(games));
}    