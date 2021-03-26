import { PropsWithChildren } from "react";
import { useDrag } from "react-dnd";
import { SolitaireCard } from "../../../store/game/suitTypes";
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

    return child;
};

interface CardProps {
    card: SolitaireCard;
    column: string;
    index: number;
    initial: boolean;
    maxDepth: number;
}
const Card = ({card, column, children, index, initial, maxDepth}: PropsWithChildren<CardProps>): JSX.Element | null => {
    
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: 'card-' + index,
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), []);

    const classes = [];

    if (isDragging) {
        classes.push('invisible');
    }

    if (!initial) {
        classes.push("card-container");
    }

    const className = classes.join(' ');

    if (!card.showing) {
        return (
            <div className={className}>
                <Back/>
                {children}
            </div>
        );
    }

    return (
        <div className={className} ref={drag}>
            <Face index={card.index} type={card.suit}/>
            {children}
        </div>
    );
};