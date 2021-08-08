import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { allowedToSeeTestingRouteAction } from "store/application/applicationSlice";
import { generateAllOneTheBoardGame } from "lib/testing/generateAllOnTheBoardGame";
import { generateOneMoveAwayGame } from "lib/testing/generateOneMoveAwayGame";
import { generateOnTheBoardWithMultipleOptions } from "lib/testing/generateOnTheBoardWithMultipleOptions";
import { clearGameAction, replaceGameAction } from "store/game/gameSlice";
import { clearHistoryAction } from "store/history/historySlice";
import { clearTrackerAction } from "store/tracker/trackerSlice";
import { GameButton } from "./components/Button"
import { generateFullBoardWithKingDraw } from "lib/testing/generateFullBoardWithKingDraw";
import { FullPageContainer } from "./layout/FullPageContainer";

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

    const allOnTheBoardClickHandler = () => {
        /**
         * Generate a one move away game and set the game
         */
         dispatch(replaceGameAction(generateAllOneTheBoardGame()));

         /**
          * Navigate to the game page
          */
         history.replace('/');
    };

    const cardWithMultipleOptionsClickHandler = () => {
        /**
         * Generate a one move away game and set the game
         */
         dispatch(replaceGameAction(generateOnTheBoardWithMultipleOptions()));

         /**
          * Navigate to the game page
          */
         history.replace('/');
    };

    const fullBoardWithKingInTheDrawClickHandler = () => {
        /**
         * Generate a one move away game and set the game
         */
         dispatch(replaceGameAction(generateFullBoardWithKingDraw()));

         /**
          * Navigate to the game page
          */
         history.replace('/');
    }

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
        <FullPageContainer usingFlex={true}>
            <div className="m-auto p-10 w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl">Testing Helpers</h1>
                <GameButton testID="cy-testing-one-move-away" buttonText="One move away from victory" onClick={oneMoveAwayClickHandler}/>
                <GameButton testID="cy-testing-all-one-the-board" buttonText="All on the board" onClick={allOnTheBoardClickHandler}/>
                <GameButton testID="cy-testing-multiple-options" buttonText="Card with multiple options" onClick={cardWithMultipleOptionsClickHandler}/>
                <GameButton testID="cy-full-board-king-in-the-draw" buttonText="Full board with king in the draw" onClick={fullBoardWithKingInTheDrawClickHandler}/>
                <GameButton testID="cy-testing-hide-page" buttonText="Hide testing page" onClick={hideTestingPageClickHandler}/>
            </div>
        </FullPageContainer>
    );
};