import { PropsWithChildren } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedOnToColumn } from "store/game/builder/cardDropper";
import { moveCardToColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "store/game/types/game";
import { Card } from "./Card";

interface CardGroupProps {
    card: LocationAwareSolitaireCard;
    index: number;
    maxDepth: number;
}

export const CardGroup = ({card, children, index, maxDepth}: PropsWithChildren<CardGroupProps>): JSX.Element | null => {
    
    const dispatch = useDispatch();

    const [{isDragging}, drag] = useDrag<LocationAwareSolitaireCard, void, {isDragging: boolean}>(() => ({
        type: 'card',
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), [card]);

    const [, drop] = useDrop<LocationAwareSolitaireCard, void, void>(() => ({
        accept: 'card',
        drop: (dragCard) => {
            dispatch(moveCardToColumnAsync({
                drag: dragCard,
                drop: card
            }));
        },
        canDrop: (dragCard) => {
            return canCardBeDroppedOnToColumn(dragCard, card);
        }
    }), [card]);

    const classes = [];

    /**
     * If the card is being being dragged 
     * then hide the card stack
     */
    if (isDragging) {
        classes.push('invisible');
    }

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

        return (
            <div className={className} ref={drag}>
                <Card card={card}/>
                {children}
            </div>
        );
    }

    /**
     * If the card is the last then
     * its allowed to be dragged and
     * dropped onto
     */
    return (
        <div className={className} ref={drag}>
            <div className="droppable" ref={drop}>
                <Card card={card}/>
                {children}
            </div>
        </div>
    );
};