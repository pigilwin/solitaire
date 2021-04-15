import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedOnToFinal } from "../../../store/game/builder/cardDropper";
import { makeCardLocationAware } from "../../../store/game/columnHelper";
import { moveCardToFinalColumnAsync } from "../../../store/game/thunk";
import { LocationAwareSolitaireCard, SolitaireCard } from "../../../store/game/types/game";
import { SUIT } from "../../../store/game/types/suit";
import { Face } from "../card/Face";

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

    const cardNumber = card.cardNumber;
    
    return (
        <div className={classes.join(' ')} ref={drag}>
            <div className="droppable" ref={drop}>
                <Face index={cardNumber} type={type}/>
            </div>
        </div>
    );
}