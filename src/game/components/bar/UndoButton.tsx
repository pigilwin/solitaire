import { useDispatch, useSelector } from "react-redux";
import { replaceGameAction } from "../../../store/game/gameSlice";
import { latestHistoryItemSelector, removeLatestHistoryItemAction } from "../../../store/history/historySlice";
import { addMoveAction } from "../../../store/tracker/trackerSlice";
import { Undo } from "./../Icons";
import { IconGameButton } from './../Button';

export const UndoGameButton = (): JSX.Element => {
    const dispatch = useDispatch();
    const game = useSelector(latestHistoryItemSelector);
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
        dispatch(replaceGameAction(game));
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