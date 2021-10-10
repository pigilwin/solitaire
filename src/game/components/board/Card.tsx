import { makeCardIndentifier } from 'lib/util';
import { LocationAwareSolitaireCard } from 'types/game';
import { Back } from './card/Back';
import { Face } from './card/Face';

interface CardProps {
    card: LocationAwareSolitaireCard;
}

export const Card = ({card}: CardProps): JSX.Element => {
    
    if (!card.showing) {
        return <Back/>;
    }
    
    return (
        <Face id={makeCardIndentifier(card)} index={card.cardNumber} type={card.suit}/>
    );
};