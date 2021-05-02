import { useSelector } from "react-redux";
import { leaderboardSelector } from "../store/leaderboard/leaderboardSlice";

export const Leaderboard = (): JSX.Element => {

    const leaderboard = useSelector(leaderboardSelector);

    return (
        <div className="flex min-h-screen bg-green-300">
            <div className="m-auto p-10 w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl">Leaderboard</h1>
            </div>
        </div>
    );
}