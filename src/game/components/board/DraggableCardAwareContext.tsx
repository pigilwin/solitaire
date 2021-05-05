import { PropsWithChildren } from "react";
import { useDrag } from "react-dnd";
import { LocationAwareSolitaireCard } from "types/game";

interface DraggableCardAwareContextProps {
    card: LocationAwareSolitaireCard;
}
export const DraggableCardAwareContext = ({card, children}: PropsWithChildren<DraggableCardAwareContextProps>): JSX.Element => {
    
    const [{isDragging}, drag] = useDrag<LocationAwareSolitaireCard, void, {isDragging: boolean}>(() => ({
        type: 'card',
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), [card]);

    const classes = ['draggable'];

    /**
     * If the card is being being dragged 
     * then hide the card stack
     */
     if (isDragging) {
        classes.push('invisible');
    }
    
    return (
        <div className={classes.join(' ')} ref={drag}>
            {children}
        </div>
    );
}