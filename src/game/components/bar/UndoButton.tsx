import { useDispatch, useSelector } from "react-redux";
import { replaceGameAction } from "store/game/gameSlice";
import { latestHistoryGameSelector, latestHistoryScoreSelector, removeLatestHistoryItemAction } from "store/history/historySlice";
import { addMoveAction, replaceScoreAction } from "store/tracker/trackerSlice";
import { IconGameButton } from './../Button';

export const UndoGameButton = (): JSX.Element => {
    const dispatch = useDispatch();
    const latestGame = useSelector(latestHistoryGameSelector);
    const latestScore = useSelector(latestHistoryScoreSelector);
    const undoHistoryClickHandler = () => {
        /**
         * Add the move action to the page
         */
        dispatch(addMoveAction());

        /**
         * Remove the latest history item action
         */
        dispatch(removeLatestHistoryItemAction());

        /**
         * Replace the action by the game
         */
        dispatch(replaceGameAction(latestGame));

        /**
         * Replace the latest score
         */
        dispatch(replaceScoreAction(latestScore));
    };
    
    return (
        <div className="flex flex-row">    
            <IconGameButton
                testID="cy-undo"
                buttonText="Undo"
                icon={<Undo/>}
                onClick={undoHistoryClickHandler}
            />
        </div>
    );
}

const Undo = (): JSX.Element => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="15" height="15" viewBox="0 0 24 24">
            <path d="M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"/>
        </svg>
    );
}