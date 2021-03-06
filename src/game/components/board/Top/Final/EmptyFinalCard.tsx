import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedOnToFinal } from "store/game/builder/cardDropper";
import { moveCardToFinalColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "types/game";
import { resolveSuitIcon } from "../../card/SuitBuilder";

interface EmptyFinalCardProps {
    type: string;
}
export const EmptyFinalCard = ({type}: EmptyFinalCardProps): JSX.Element => {
    
    const dispatch = useDispatch();

    const large = resolveSuitIcon(type, true);

    const [, drop] = useDrop<LocationAwareSolitaireCard, void, void>(() => ({
        accept: 'card',
        drop: (drag) => {
            dispatch(moveCardToFinalColumnAsync({
                drag: drag,
                column: type.toLowerCase()
            }));
        },
        canDrop: (drag) => {
            return canCardBeDroppedOnToFinal(drag, type, []);
        }
    }), []);

    return (
        <div ref={drop} className="playing-card-container flex flex-col justify-center">
            <div className="flex justify-center">
                {large}
            </div>
        </div>
    );
};