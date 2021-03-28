import { useDrag } from "react-dnd";
import { SolitaireCard } from "../../../../../store/game/suitTypes";
import { Face } from "../../../card/Face";

interface DrawCardProps {
    card: SolitaireCard;
}
export const DrawCard = ({card}: DrawCardProps): JSX.Element => {
    
    const [, drag, ] = useDrag(() => ({
        type: 'card',
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), []);

    return (
        <div ref={drag}>
            <Face type={card.suit} index={card.cardNumber}/>
        </div>
    );
};