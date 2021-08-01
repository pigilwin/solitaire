import { Dispatch } from "@reduxjs/toolkit";
import { enhanceCard } from "lib/enhancers/enhancers";
import { invokeIsCardClickable } from "lib/invokers/invokeIsCardClickable";
import { PropsWithChildren, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentGameSelector } from "store/game/gameSlice";
import { moveCardToColumnAsync, moveCardToEmptyColumnAsync, moveCardToFinalColumnAsync } from "store/game/thunk";
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
    const enchancedCard = enhanceCard(card);

    /**
     * If the card is a king then use the specific action 
     * dedicated to moving cards to empty columns
     */
    if (enchancedCard.isAKing()) {
        dispatch(moveCardToEmptyColumnAsync({
            drag: card,
            column: droppableCard.location.area
        }));
        return;
    }

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