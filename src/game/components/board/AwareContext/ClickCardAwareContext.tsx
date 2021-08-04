import { Dispatch } from "@reduxjs/toolkit";
import { invokeIsCardClickable } from "lib/invokers/invokeIsCardClickable";
import { PropsWithChildren, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentGameSelector } from "store/game/gameSlice";
import { moveCardToColumnAsync, moveCardToFinalColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "types/game";
import { CanCardMoveFromWorker } from "types/worker";

interface ClickCardAwareContextProps {
    card: LocationAwareSolitaireCard;
}
export const ClickCardAwareContext = ({card, children}: PropsWithChildren<ClickCardAwareContextProps>) => {
    
    const dispatch = useDispatch();
    const solitare = useSelector(currentGameSelector);
    const doubleClickEventListener = async (e: MouseEvent) => {
        e.stopPropagation();
        const potentialMoves = await invokeIsCardClickable(solitare, card);
        const keys = Object.keys(potentialMoves);

        if (keys.length === 0) {
            return;
        }

        handleOnlyOneResponse(dispatch, potentialMoves, keys, card);
        return;
    };
    
    return (
        <div data-cy-test-id={"click-" + card.cardNumber + "-" + card.suit} className="click-card cursor-pointer" onClick={doubleClickEventListener}>
            {children}
        </div>
    );
};

const handleOnlyOneResponse = (dispatch: Dispatch<any>, potentialMoves: CanCardMoveFromWorker, keys: string[], card: LocationAwareSolitaireCard): void => {
    const droppableCard = potentialMoves[keys[keys.length - 1]];

    /**
     * If the card has only one place to go and its the 
     * final then just dispatch the action
     */
    if (droppableCard.location.namespace === 'final') {
        dispatch(moveCardToFinalColumnAsync({
            column: droppableCard.location.area,
            drag: card
        }));
        return;
    }

    dispatch(moveCardToColumnAsync({
        drag: card,
        drop: droppableCard as LocationAwareSolitaireCard
    }));
    return;
}