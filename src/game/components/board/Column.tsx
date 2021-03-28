import { PropsWithChildren } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ColumnAwareSolitaireCard, SolitaireCard } from "../../../store/game/types/game";
import { Face } from "../card/Face";
import { Back } from "../card/Back";
import { canCardBeDroppedOnToColumn } from "../../../store/game/cardDropper";
import { useDispatch } from "react-redux";
import { moveCardToColumnAction } from "../../../store/game/gameSlice";
import { makeCardColumnAware } from "../../../store/game/columnHelper";


interface ColumnProps {
    cards: SolitaireCard[];
    column: string;
}
export const Column = ({cards, column}: ColumnProps): JSX.Element | null => {
        
    const depth = cards.length;
    let child = null;
    
    /**
     * Generate each card appending the last generated card as a child
     * only apply the margin if its any card apart from the last
     */
    for (let i = depth - 1; i >= 0; i--) {

        const columnAwareCard = makeCardColumnAware(cards[i], column);

        child = (<Card 
            card={columnAwareCard} 
            index={i}
            maxDepth={depth}
            >{child}</Card>
        );
    }

    return child;
};

interface CardProps {
    card: ColumnAwareSolitaireCard;
    index: number;
    maxDepth: number;
}
const Card = ({card, children, index, maxDepth}: PropsWithChildren<CardProps>): JSX.Element | null => {
    
    const dispatch = useDispatch();

    const [{isDragging}, drag] = useDrag<ColumnAwareSolitaireCard, void, {isDragging: boolean}>(() => ({
        type: 'card',
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), []);

    const [, drop] = useDrop<ColumnAwareSolitaireCard, void, void>(() => ({
        accept: 'card',
        drop: (dropCard) => {
            dispatch(moveCardToColumnAction({
                drag: card,
                drop: dropCard
            }));
        },
        canDrop: (drop) => {
            return canCardBeDroppedOnToColumn(drop, card);
        }
    }), []);

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
                <Back/>
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
                <Face index={card.cardNumber} type={card.suit}/>
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
                <Face index={card.cardNumber} type={card.suit}/>
                {children}
            </div>
        </div>
    );
};