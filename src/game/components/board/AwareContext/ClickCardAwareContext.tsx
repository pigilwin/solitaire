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
    const clickEventListener = async (e: MouseEvent) => {
        e.stopPropagation();
        const move = await invokeIsCardClickable(solitare, card);

        if (move === undefined) {
            return;
        }

        handleOnlyOneResponse(dispatch, move, card);
        return;
    };
    
    return (
        <div data-cy-test-id={"click-" + card.cardNumber + "-" + card.suit} className="click-card cursor-pointer" onClick={clickEventListener}>
            {children}
        </div>
    );
};

const handleOnlyOneResponse = (dispatch: Dispatch<any>, move: CanCardMoveFromWorker, card: LocationAwareSolitaireCard): void => {
    if (move === undefined) {
        return;
    }
    
    /**
     * If the card has only one place to go and its the 
     * final then just dispatch the action
     */
    if (move.location.namespace === 'final') {
        dispatch(moveCardToFinalColumnAsync({
            column: move.location.area,
            drag: card
        }));
        return;
    }

    dispatch(moveCardToColumnAsync({
        drag: card,
        drop: move as LocationAwareSolitaireCard
    }));
    return;
}