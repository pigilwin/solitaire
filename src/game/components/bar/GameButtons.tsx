import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { areWeAllowedToSeeTestingRouteSelector } from "../../../store/application/applicationSlice";
import { initialiseGameAsync } from "../../../store/game/thunk";
import { GameButton } from '../Button';

export const GameButtons = (): JSX.Element => {

    const dispatch = useDispatch();
    const history = useHistory();

    const newGameClickHandler = () => {
        history.replace('/');
        dispatch(initialiseGameAsync());
    };

    const leaderboardClickHandler = () => {};
    const settingsClickHandler = () => {};
    const testingClickHandler = () => {
        history.replace('/testing');
    };

    let testing: JSX.Element | null = null;
    if(useSelector(areWeAllowedToSeeTestingRouteSelector)) {
        testing = (<div className="px-1">
            <GameButton buttonText="Testing Routes" onClick={testingClickHandler}/>
        </div>);
    }

    return (
        <div className="flex flex-row">
            <div className="px-1">
                <GameButton buttonText="New Game" onClick={newGameClickHandler}/>
            </div>
            <div className="px-1">
                <GameButton buttonText="Leaderboard" onClick={leaderboardClickHandler}/>
            </div>
            <div className="px-1">
                <GameButton buttonText="Settings" onClick={settingsClickHandler}/>
            </div>
            {testing}
        </div>
    );
}