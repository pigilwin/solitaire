import { enhanceCard } from "lib/enhancers/enhancers";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { moveCardToEmptyColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "types/game";

import { EmptyCard } from '../EmptyCard';

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
            return enhanceCard(card).isAKing();
        }
    }), [column]);
    
    return (
        <div ref={drop} className="droppable">
            <EmptyCard/>
        </div>
    );
}