import { useIsTheCardClickable } from "hooks/useIsTheCardClickable";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { currentGameSelector } from "store/game/gameSlice";
import { LocationAwareSolitaireCard } from "types/game";

import { Card } from "./Card";

import { DraggableCardAwareContext } from "./DraggableCardAwareContext";
import { DroppableCardAwareContext } from "./DroppableCardAwareContext";

interface CardGroupProps {
    card: LocationAwareSolitaireCard;
    index: number;
    maxDepth: number;
}

export const CardGroup = ({card, children, index, maxDepth}: PropsWithChildren<CardGroupProps>): JSX.Element | null => {
    
    const [isClickable] = useIsTheCardClickable(useSelector(currentGameSelector), card);
    console.log(isClickable);

    const classes = [];
    /**
     * If its not the initial card then 
     * assign the container class to apply
     * the margin
     */
    if (index !== 0){
        classes.push("card-container");
    }

    const className = classes.join(' ');

    /**
     * If the card is not set to show then show the back
     */
    if (!card.showing) {
        return (
            <div className={className}>
                <Card card={card}/>
                {children}
            </div>
        );
    }

    /**
     * If the card is not the last then 
     * its allowed to be dragged
     */
    if (index !== maxDepth - 1){

        const draggableCard = (
            <div className={className}>
                <DraggableCardAwareContext card={card}>
                    <Card card={card}/>
                    {children}
                </DraggableCardAwareContext>
            </div>
        );
        return draggableCard;
    }

    /**
     * If the card is the last then
     * its allowed to be dragged and
     * dropped onto
     */
    const draggableDroppableCard = (
        <div className={className}>
            <DraggableCardAwareContext card={card}>
                <DroppableCardAwareContext card={card}>
                    <Card card={card}/>
                    {children}
                </DroppableCardAwareContext>
            </DraggableCardAwareContext>
        </div>
    );
    return draggableDroppableCard;
};