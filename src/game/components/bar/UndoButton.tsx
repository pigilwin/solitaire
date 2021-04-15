import { useDispatch, useSelector } from "react-redux";
import { replaceGameAction } from "../../../store/game/gameSlice";
import { latestHistoryGameSelector, latestHistoryScoreSelector, removeLatestHistoryItemAction } from "../../../store/history/historySlice";
import { addMoveAction, replaceScoreAction } from "../../../store/tracker/trackerSlice";
import { Undo } from "./../Icons";
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
                buttonText="Undo"
                icon={<Undo/>}
                onClick={undoHistoryClickHandler}
            />
        </div>
    );
}