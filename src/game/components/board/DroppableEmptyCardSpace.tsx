import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedToEmptyColumn } from "../../../store/game/builder/cardDropper";
import { moveCardToEmptyColumnAsync } from "../../../store/game/thunk";
import { LocationAwareSolitaireCard } from "../../../store/game/types/game";

interface EmptyCardSpaceProps {
    column: string;
}
export const DroppableEmptyCardSpace = ({column}: EmptyCardSpaceProps): JSX.Element => {
    
    const dispatch = useDispatch();

    const [, drop] = useDrop<LocationAwareSolitaireCard, void, void>(() => ({
        accept: 'card',
        drop: (card) => {
            dispatch(moveCardToEmptyColumnAsync({
                drag: card,
                column: column
            }));
        },
        canDrop: (card) => {
            return canCardBeDroppedToEmptyColumn(card);
        }
    }), [column]);
    
    return (
        <div ref={drop} className="playing-card-container droppable"></div>
    );
}