import { useDrop } from "react-dnd";
import { canCardBeDroppedOnToFinal } from "../../../../../store/game/cardDropper";
import { SolitaireCard } from "../../../../../store/game/suitTypes";
import { resolveLargeSuitIcon } from "../../../card/SuitBuilder";

interface EmptyFinalCardProps {
    type: string;
}
export const EmptyFinalCard = ({type}: EmptyFinalCardProps): JSX.Element => {
    
    const large = resolveLargeSuitIcon(type);

    /**
     * CollectionOptions is not used but is now disabled
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [CollectionOptions, drop] = useDrop<SolitaireCard, void, void>(() => ({
        accept: 'card',
        drop: (i, monitor) => {
            console.log(i, monitor);
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