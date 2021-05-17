import { invokeIsCardClickable } from "invokers/invokeIsCardClickable";
import { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePossibleMovesAction } from "store/game/gameMoveSlice";
import { currentGameSelector } from "store/game/gameSlice";
import { moveCardToColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "types/game";

interface DoubleClickCardAwareContextProps {
    card: LocationAwareSolitaireCard;
}
export const DoubleClickCardAwareContext = ({card, children}: PropsWithChildren<DoubleClickCardAwareContextProps>) => {
    
    const dispatch = useDispatch();
    const solitare = useSelector(currentGameSelector);
    const doubleClickEventListener = async () => {
        const potentialMoves = await invokeIsCardClickable(solitare, card);
        console.log(potentialMoves);
        /**
         * If the potential moves are only one then execute the move
         */
        if (potentialMoves.length === 1) {
            dispatch(moveCardToColumnAsync({
                drag: card,
                drop: potentialMoves[0]
            }));
            return;
        }
        dispatch(updatePossibleMovesAction({
            cardWantingToBeMoved: card,
            potentialMoves: potentialMoves
        }));
    };
    
    return (
        <div className="double-click-card" onDoubleClick={doubleClickEventListener}>
            {children}
        </div>
    );
};