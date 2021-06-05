import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedOnToColumn } from "store/game/builder/cardDropper";
import { moveCardToColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "types/game";

interface DroppableCardAwareContextProps {
    card: LocationAwareSolitaireCard;
}
export const DroppableCardAwareContext = ({card, children}: PropsWithChildren<DroppableCardAwareContextProps>): JSX.Element => {
    
    const dispatch = useDispatch();

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
    
    return (
        <div data-cy-test-id={'droppable-' + card.cardNumber + '-' + card.suit} className="droppable" ref={drop}>
            {children} 
        </div>
    );
}