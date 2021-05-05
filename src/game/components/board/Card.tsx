import { SolitaireCard } from 'store/game/types/game';
import { Back } from './card/Back';
import { Face } from './card/Face';

interface CardProps {
    card: SolitaireCard;
}

export const Card = ({card}: CardProps): JSX.Element => {
    
    if (!card.showing) {
        return <Back/>;
    }
    
    return (
        <Face index={card.cardNumber} type={card.suit}/>
    );
};