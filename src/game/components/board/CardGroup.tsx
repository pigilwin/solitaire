import { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";

import { useEffectAsync } from "hooks/useEffectAsync";

import { currentGameSelector } from "store/game/gameSlice";
import { LocationAwareSolitaireCard } from "types/game";

import { Card } from "./Card";

import { DraggableCardAwareContext } from "./DraggableCardAwareContext";
import { DroppableCardAwareContext } from "./DroppableCardAwareContext";
import { canCardMove } from "invokeWorkers";

interface CardGroupProps {
    card: LocationAwareSolitaireCard;
    index: number;
    maxDepth: number;
}

export const CardGroup = ({card, children, index, maxDepth}: PropsWithChildren<CardGroupProps>): JSX.Element | null => {
    
    const solitaire = useSelector(currentGameSelector);

    const [clickable, setClickable] = useState(false);
    useEffectAsync(async () => {
        const state = await canCardMove(solitaire, card);
        setClickable(state);
    }, [card]);

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

        if (clickable) {
            return (
                <div className="clickable">
                    {draggableCard}
                </div>
            );
        }

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

    if (clickable) {
        return (
            <div className="clickable">
                {draggableDroppableCard}
            </div>
        );
    }

    return draggableDroppableCard;
};