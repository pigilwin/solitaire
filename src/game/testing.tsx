import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { allowedToSeeTestingRouteAction } from "store/application/applicationSlice";
import { generateOneMoveAwayGame } from "store/game/builder/testingBuilder";
import { clearGameAction, replaceGameAction } from "store/game/gameSlice";
import { clearHistoryAction } from "store/history/historySlice";
import { clearTrackerAction } from "store/tracker/trackerSlice";
import { GameButton } from "./components/Button"

export const Testing = (): JSX.Element => {

    const dispatch = useDispatch();
    const history = useHistory();

    const oneMoveAwayClickHandler = () => {
        /**
         * Generate a one move away game and set the game
         */
        dispatch(replaceGameAction(generateOneMoveAwayGame()));

        /**
         * Navigate to the game page
         */
        history.replace('/');
    };
    const allOnTheBoardClickHandler = () => {};
    const hideTestingPageClickHandler = () => {
        /**
         * Hide the test route
         */
        dispatch(allowedToSeeTestingRouteAction(false));

        /**
         * Clear the tracker
         */
        dispatch(clearTrackerAction());

        /**
         * Clear the history
         */
        dispatch(clearHistoryAction());

        /**
         * Clear the game
         */
        dispatch(clearGameAction());

        /**
         * Navigate home
         */
        history.replace('/');
    };

    return (
        <div className="flex min-h-screen bg-green-300">
            <div className="m-auto p-10 w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl">Testing Helpers</h1>
                <GameButton buttonText="One move away from victory" onClick={oneMoveAwayClickHandler}/>
                <GameButton buttonText="All on the board" onClick={allOnTheBoardClickHandler}/>
                <GameButton buttonText="Hide testing page" onClick={hideTestingPageClickHandler}/>
            </div>
        </div>
    );
};