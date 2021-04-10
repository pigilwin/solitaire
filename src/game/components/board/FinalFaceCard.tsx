import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedOnToFinal } from "../../../store/game/builder/cardDropper";
import { moveCardToFinalColumnAction } from "../../../store/game/gameSlice";
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
            dispatch(moveCardToFinalColumnAction({
                drag: drag,
                column: type.toLowerCase()
            }));
        },
        canDrop: (drag) => {
            return canCardBeDroppedOnToFinal(drag, type, cards);
        }
    }), []);

    const cardNumber = cards[cards.length -1].cardNumber;
    
    return (
        <div className="droppable" ref={drop}>
            <Face index={cardNumber} type={type}/>
        </div>
    );
}