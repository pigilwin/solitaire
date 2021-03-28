import { useDrag } from "react-dnd";
import { SolitaireCard } from "../../../../../store/game/suitTypes";
import { Face } from "../../../card/Face";

interface DrawCardProps {
    draw: SolitaireCard[];
}
export const DrawCard = ({draw}: DrawCardProps): JSX.Element => {
    
    const [, drag, ] = useDrag(() => ({
        type: 'card',
        item: card,
        collect: (m) => {
            return {
                isDragging: m.isDragging() 
            };
        }
    }), []);

    /**
     * If no draws have been found then show a empty card space
     */
    if (draw.length === 0) {
        return (<div className="playing-card-container"></div>);
    }

    const card = draw[draw.length - 1];

    return (
        <div ref={drag}>
            <Face type={card.suit} index={card.cardNumber}/>
        </div>
    );
};