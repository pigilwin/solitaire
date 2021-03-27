import { PropsWithChildren } from "react";
import { useDrag, useDrop } from "react-dnd";
import { SolitaireCard } from "../../../store/game/suitTypes";
import { Face } from "../card/Face";
import { Back } from "../card/Back";


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
        child = (<Card 
            card={cards[i]} 
            index={i} 
            column={column}
            maxDepth={depth}
            >{child}</Card>
        );
    }

    return child;
};

interface CardProps {
    card: SolitaireCard;
    column: string;
    index: number;
    maxDepth: number;
}
const Card = ({card, column, children, index, maxDepth}: PropsWithChildren<CardProps>): JSX.Element | null => {
    /**
     * Preview is not used but is now disabled
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: 'card',
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), []);

    /**
     * CollectionOptions is not used but is now disabled
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [CollectionOptions, drop] = useDrop(() => ({
        accept: 'card',
        drop: (i, monitor) => {
            console.log(i, card);
        },
        canDrop: (i, monitor) => {
            console.log(i, card);
            return true;
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
                <Face index={card.index} type={card.suit}/>
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
                <Face index={card.index} type={card.suit}/>
                {children}
            </div>
        </div>
    );
};