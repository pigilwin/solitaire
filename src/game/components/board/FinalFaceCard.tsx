import { useDrop } from "react-dnd";
import { SolitaireCard, SUIT } from "../../../store/game/suitTypes";
import { Face } from "../card/Face";

interface FinalFaceCardProps {
    cards: SolitaireCard[];
    type: SUIT;
}
export const FinalFaceCard = ({cards, type}: FinalFaceCardProps): JSX.Element => {
    
    /**
     * CollectionOptions is not used but is now disabled
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [CollectionOptions, drop] = useDrop(() => ({
        accept: 'card',
        drop: (i, monitor) => {
            console.log(i, monitor);
        },
        canDrop: (i, monitor) => {
            console.log(i, monitor);
            return true;
        }
    }), []);

    const index = (cards.pop() as SolitaireCard).index;
    
    return (
        <div ref={drop}>
            <Face index={index} type={type}/>
        </div>
    );
}