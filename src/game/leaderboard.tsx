import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { GameButton } from "./components/Button";
import { Tile } from "./components/leaderboard/Tile";
import { FullPageContainer } from './layout/FullPageContainer';

import { leaderboardSelector } from "store/leaderboard/leaderboardSlice";

export const Leaderboard = (): JSX.Element => {

    const history = useHistory();
    const leaderboard = useSelector(leaderboardSelector);
    const onClickHandler = () => {
        history.replace('/');
    };


    /**
     * If we have no leaderboard items then show the 
     */
    if (leaderboard.length === 0) {
        return (
            <FullPageContainer usingFlex={true}>
                <div className="m-auto w-2/3 bg-white flex flex-col justify-between space-y-4 rounded-md">
                    <h1 className="text-center text-4xl mt-4">Leaderboard - No saved games</h1>
                    <div className="my-2 text-center">
                        <GameButton testID="cy-leaderboard-go-home" buttonText="Go Home" onClick={onClickHandler}/>
                    </div>
                </div>
            </FullPageContainer>
        );
    }

    return (
        <FullPageContainer usingFlex={true}>
            <div className="m-auto w-2/3 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl mt-4">Leaderboard</h1>
                <div className="my-2 text-center">
                    <GameButton testID="cy-leaderboard-go-home" buttonText="Go Home" onClick={onClickHandler}/>
                </div>
                {leaderboard.map((record, index) => {
                    return <Tile record={record} index={index} key={record.id}/>;
                })}
            </div>
        </FullPageContainer>
    );
}