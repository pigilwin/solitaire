import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { areWeAllowedToSeeTestingRouteSelector } from "store/application/applicationSlice";
import { initialiseGameAsync } from "store/game/thunk";
import { CypressTesting } from "types/test";
import { GameButton } from '../Button';

interface GameButtonProps {
    undoButton: JSX.Element | null;
}
export const GameButtons = ({undoButton}: GameButtonProps): JSX.Element => {

    const dispatch = useDispatch();
    const history = useHistory();

    const newGameClickHandler = () => {
        history.replace('/');
        dispatch(initialiseGameAsync());
    };

    let testing: JSX.Element | null = null;
    if(useSelector(areWeAllowedToSeeTestingRouteSelector)) {
        testing = <RouteButton testID="cy-testing" buttonText="Testing" route="/testing"/>;
    }

    return (
        <div className="flex flex-row">
            {undoButton}
            <div className="px-1">
                <GameButton testID="cy-new-game" buttonText="New Game" onClick={newGameClickHandler}/>
            </div>
            <RouteButton testID="cy-leaderboard" buttonText="Leaderboard" route="/leaderboard"/>
            <RouteButton testID="cy-settings" buttonText="Settings" route="/settings"/>
            {testing}
        </div>
    );
}

interface RouteButtonProps extends CypressTesting {
    route: string;
    buttonText: string;
}
const RouteButton = ({route, buttonText, testID}: RouteButtonProps): JSX.Element => {
    
    const history = useHistory();
    const clickHandler = () => {
        history.push(route);
    };

    return (
        <div className="px-1">
            <GameButton testID={testID} buttonText={buttonText} onClick={clickHandler}/>
        </div>
    );
}