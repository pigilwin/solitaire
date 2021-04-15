import { useDispatch } from "react-redux";
import { useAnime } from "../../../hooks/useAnime";
import { initialiseGameAsync } from "../../../store/game/thunk";
import { GameButton } from '../Button';

export const GameButtons = (): JSX.Element => {

    const dispatch = useDispatch();
    const [animation, elementReference] = useAnime<HTMLButtonElement>();


    const newGameClickHandler = () => {
        animation.current?.play();
        dispatch(initialiseGameAsync());
    };

    const leaderboardClickHandler = () => {};
    const settingsClickHandler = () => {};

    return (
        <div className="flex flex-row">
            <div className="px-1">
                <GameButton ref={elementReference} buttonText="New Game" onClick={newGameClickHandler}/>
            </div>
            <div className="px-1">
                <GameButton buttonText="Leaderboard" onClick={leaderboardClickHandler}/>
            </div>
            <div className="px-1">
                <GameButton buttonText="Settings" onClick={settingsClickHandler}/>
            </div>
        </div>
    );
}