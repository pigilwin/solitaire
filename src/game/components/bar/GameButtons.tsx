import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { areWeAllowedToSeeTestingRouteSelector } from "store/application/applicationSlice";
import { initialiseGameAsync } from "store/game/thunk";
import { GameButton } from '../Button';

export const GameButtons = (): JSX.Element => {

    const dispatch = useDispatch();
    const history = useHistory();

    const newGameClickHandler = () => {
        history.replace('/');
        dispatch(initialiseGameAsync());
    };

    let testing: JSX.Element | null = null;
    if(useSelector(areWeAllowedToSeeTestingRouteSelector)) {
        testing = <RouteButton buttonText="Testing" route="/testing"/>;
    }

    return (
        <div className="flex flex-row">
            <div className="px-1">
                <GameButton buttonText="New Game" onClick={newGameClickHandler}/>
            </div>
            <RouteButton buttonText="Leaderboard" route="/leaderboard"/>
            <RouteButton buttonText="Settings" route="/settings"/>
            {testing}
        </div>
    );
}

interface RouteButtonProps {
    route: string;
    buttonText: string;
}
const RouteButton = ({route, buttonText}: RouteButtonProps): JSX.Element => {
    
    const history = useHistory();
    const clickHandler = () => {
        history.push(route);
    };

    return (
        <div className="px-1">
            <GameButton buttonText={buttonText} onClick={clickHandler}/>
        </div>
    );
}