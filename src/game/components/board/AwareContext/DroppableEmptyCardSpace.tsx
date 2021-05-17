import { isCardAKing } from "lib/util";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { moveCardToEmptyColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "types/game";

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
            return isCardAKing(card);
        }
    }), [column]);
    
    return (
        <div ref={drop} className="playing-card-container droppable"></div>
    );
}