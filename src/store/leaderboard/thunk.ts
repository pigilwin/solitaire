import { CompletedGame } from "typings/leaderboard";
import { v4 } from "uuid";
import { AppDispatch, AppThunk } from "..";
import { clearGameAction } from "../game/gameSlice";
import { clearHistoryAction } from "../history/historySlice";
import { RootStateHook } from "../rootReducer";
import { clearTrackerAction } from "../tracker/trackerSlice";
import { LeaderboardDatabase } from "./leaderboardDatabase";
import { addGameAction, loadGamesAction, removeGameAction } from "./leaderboardSlice";

export const loadLeaderboardAsync = (): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const games = await LeaderboardDatabase.read();
    dispatch(loadGamesAction(games));
}

export const completeGameAsync = (
    name: string
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const reducer = getState().trackerReducer;
    const completed: CompletedGame = {
        id: v4(),
        name: name,
        score: reducer.score,
        moves: reducer.moves,
        date: (new Date()).toISOString()
    };

    await LeaderboardDatabase.create(completed);

    dispatch(addGameAction(completed));

    dispatch(clearGameAction());
    dispatch(clearHistoryAction());
    dispatch(clearTrackerAction());
}

export const deleteCompletedGameAsync = (
    id: string
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    await LeaderboardDatabase.delete(id);

    dispatch(removeGameAction(id));
};