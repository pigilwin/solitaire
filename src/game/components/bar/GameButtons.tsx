import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { areWeAllowedToSeeTestingRouteSelector } from "store/application/applicationSlice";
import { initialiseGameAsync } from "store/game/thunk";
import { CypressTesting } from "types/test";
import { GameButton } from '../Button';

interface GameButtonProps {
    undoButton: JSX.Element | null;
    id: string;
}
export const GameButtons = ({undoButton, id}: GameButtonProps): JSX.Element => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newGameClickHandler = () => {

        if (id.length === 0) {
            navigate('/');
            dispatch(initialiseGameAsync());
            return;
        }
        toast.warning(<GameInProgressButton navigate={navigate}/>);
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
    
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(route);
    };

    return (
        <div className="px-1">
            <GameButton testID={testID} buttonText={buttonText} onClick={clickHandler}/>
        </div>
    );
}

interface GameInProgressButtonProps {
    navigate: NavigateFunction;
}
const GameInProgressButton = ({navigate}: GameInProgressButtonProps): JSX.Element => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        navigate('/');
        dispatch(initialiseGameAsync());
    };
    return (
        <div className="px-1">
            Game currently in progress
            <GameButton testID="cy-game-in-progress" buttonText="Play new game" onClick={clickHandler}/>
        </div>
    );
}