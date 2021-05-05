import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { leaderboardSelector } from "store/leaderboard/leaderboardSlice";
import { GameButton } from "./components/Button";
import { Tile } from "./components/leaderboard/Tile";

export const Leaderboard = (): JSX.Element => {

    const history = useHistory();
    const leaderboard = useSelector(leaderboardSelector);
    const onClickHandler = () => {
        history.replace('/');
    };

    return (
        <div className="flex min-h-screen bg-green-300">
            <div className="m-auto w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl mt-4">Leaderboard</h1>
                <div className="my-2 text-center">
                    <GameButton buttonText="Go Home" onClick={onClickHandler}/>
                </div>
                {leaderboard.map((record, index) => {
                    return <Tile record={record} index={index} key={record.id}/>;
                })}
            </div>
        </div>
    );
}