import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedOnToFinal } from "../../../../../store/game/builder/cardDropper";
import { moveCardToFinalColumnAction } from "../../../../../store/game/gameSlice";
import { LocationAwareSolitaireCard } from "../../../../../store/game/types/game";
import { resolveLargeSuitIcon } from "../../../card/SuitBuilder";

interface EmptyFinalCardProps {
    type: string;
}
export const EmptyFinalCard = ({type}: EmptyFinalCardProps): JSX.Element => {
    
    const dispatch = useDispatch();

    const large = resolveLargeSuitIcon(type);

    const [, drop] = useDrop<LocationAwareSolitaireCard, void, void>(() => ({
        accept: 'card',
        drop: (drag) => {
            dispatch(moveCardToFinalColumnAction({
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