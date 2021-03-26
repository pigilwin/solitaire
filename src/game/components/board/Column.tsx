import { SolitaireCard } from "../../../store/game/suitTypes";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PropsWithChildren } from "react";
import { Face } from "../card/Face";
import { Back } from "../card/Back";


interface ColumnProps {
    cards: SolitaireCard[];
    column: string;
}
export const Column = ({cards, column}: ColumnProps): JSX.Element => {

    const reversed = Array.from(cards).reverse();
    /**
     * Generate the first top card
     * If it is the only card in the list the don't apply the margin
     */
    let child = (<Card 
        initial={reversed.length === 1} 
        card={reversed[0]} 
        index={0}
        maxDepth={0} 
        column={column}/>);

    const depth = reversed.length - 1;
    
    /**
     * Generate each card appending the last generated card as a child
     * only apply the margin if its any card apart from the last
     */
    for (let i = 1; i < reversed.length; i++) {
        child = (<Card 
            initial={i === depth} 
            card={reversed[i]} index={i} 
            column={column}
            maxDepth={depth}
            >{child}</Card>
        );
    }

    return (
        <Droppable droppableId={"column-droppable-index"}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}{...provided.droppableProps} className="flex flex-col">
                    {child}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

interface CardProps {
    card: SolitaireCard;
    column: string;
    index: number;
    initial: boolean;
    maxDepth: number;
}
const Card = ({card, column, children, index, initial, maxDepth}: PropsWithChildren<CardProps>): JSX.Element | null => {
    
    const className = initial ? "" : "card-container";

    const draggableCard = (
        <Draggable draggableId={"column-index-" + column} index={index}>
            {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={className}
                    style={provided.draggableProps.style}
                >
                    {getCardType(card)}
                    {children}
                </div>
            )}
        </Draggable>
    );

    if (index !== maxDepth) {
        return draggableCard;
    }


    return (
        <Droppable droppableId={"column-droppable-last"}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}{...provided.droppableProps} className="flex flex-col">
                    {draggableCard}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

/**
 * Get the card type
 * @param {SolitaireCard} card 
 * @returns {JSX.Element} 
 */
const getCardType = (card: SolitaireCard): JSX.Element => {
    if (card.showing) {
        return (<Face index={card.index} type={card.suit}/>);
    }

    return (<Back/>);
};