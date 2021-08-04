import { PropsWithChildren } from "react";
import { LocationAwareSolitaireCard } from "types/game";

import { Card } from "./Card";

import { DraggableCardAwareContext } from "./AwareContext/DraggableCardAwareContext";
import { DroppableCardAwareContext } from "./AwareContext/DroppableCardAwareContext";
import { ClickCardAwareContext } from "./AwareContext/ClickCardAwareContext";

interface CardGroupProps {
    card: LocationAwareSolitaireCard;
    index: number;
    maxDepth: number;
}

export const CardGroup = ({card, children, index, maxDepth}: PropsWithChildren<CardGroupProps>): JSX.Element | null => {

    const classes = [];
    
    /**
     * If its not the initial card then 
     * assign the container class to apply
     * the margin
     */
    if (index !== 0){
        /**
         * If there are more than 10 cards on the stack apply more margin
         */
        if (maxDepth < 10){
            classes.push("card-container");
        } else {
            classes.push("card-container-more-than-ten");
        }
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
                <ClickCardAwareContext card={card}>
                    <DraggableCardAwareContext card={card}>
                        <Card card={card}/>
                        {children}
                    </DraggableCardAwareContext>
                </ClickCardAwareContext>
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
            <ClickCardAwareContext card={card}>
                <DraggableCardAwareContext card={card}>
                    <DroppableCardAwareContext card={card}>
                        <Card card={card}/>
                        {children}
                    </DroppableCardAwareContext>
                </DraggableCardAwareContext>
            </ClickCardAwareContext>
        </div>
    );
    return draggableDroppableCard;
};