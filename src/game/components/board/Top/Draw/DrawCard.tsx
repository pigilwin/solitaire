import { useDrag } from "react-dnd";
import { LocationAwareSolitaireCard } from "../../../../../store/game/types/game";
import { Face } from "../../../card/Face";

interface DrawCardProps {
    card: LocationAwareSolitaireCard;
}
export const DrawCard = ({card}: DrawCardProps): JSX.Element => {
    
    const [collection, drag, ] = useDrag(() => ({
        type: 'card',
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), [card]);

    const classes = [];

    /**
     * If the current item is being dragged then hide the container
     */
    if (collection.isDragging) {
        classes.push('invisible');
    }

    return (
        <div ref={drag} className={classes.join(' ')}>
            <Face type={card.suit} index={card.cardNumber}/>
        </div>
    );
};