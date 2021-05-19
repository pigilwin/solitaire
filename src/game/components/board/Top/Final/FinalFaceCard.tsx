import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { LocationAwareSolitaireCard, SolitaireCard } from "types/game";
import { SUIT } from "types/suit";

import { makeCardLocationAware } from "lib/util";

import { canCardBeDroppedOnToFinal } from "store/game/builder/cardDropper";
import { moveCardToFinalColumnAsync } from "store/game/thunk";

import { Card } from '../../Card';

interface FinalFaceCardProps {
    cards: SolitaireCard[];
    type: SUIT;
}
export const FinalFaceCard = ({cards, type}: FinalFaceCardProps): JSX.Element => {
    
    const dispatch = useDispatch();

    const [, drop] = useDrop<LocationAwareSolitaireCard, void, void>(() => ({
        accept: 'card',
        drop: (drag) => {
            dispatch(moveCardToFinalColumnAsync({
                drag: drag,
                column: type.toLowerCase()
            }));
        },
        canDrop: (drag) => {
            return canCardBeDroppedOnToFinal(drag, type, cards);
        }
    }), [cards]);

    const card = makeCardLocationAware(cards[cards.length -1], 'final', type.toLowerCase());

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

    if (isDragging) {
        classes.push('invisible');
    }
    
    return (
        <div className={classes.join(' ')} ref={drag}>
            <div className="droppable" ref={drop}>
                <Card card={card}/>
            </div>
        </div>
    );
}