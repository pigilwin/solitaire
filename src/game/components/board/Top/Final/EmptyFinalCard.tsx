import { makeCardIndentifier } from "lib/util";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { canCardBeDroppedOnToFinal } from "store/game/builder/cardDropper";
import { moveCardToFinalColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "@typings/game";
import { resolveSuitIcon } from "../../card/SuitBuilder";
import { AppDispatch } from "@store/index";

interface EmptyFinalCardProps {
    type: string;
}
export const EmptyFinalCard = ({type}: EmptyFinalCardProps): JSX.Element => {
    
    const dispatch = useDispatch<AppDispatch>();

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
        <div id={makeCardIndentifier({location: {
            namespace: 'final',
            area: type.toLowerCase()
        }})} ref={drop} className="playing-card-container flex flex-col justify-center">
            <div className="flex justify-center">
                {large}
            </div>
        </div>
    );
};