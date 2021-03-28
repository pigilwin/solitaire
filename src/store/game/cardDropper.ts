import { SUIT } from "./types/suit";
import { SolitaireCard  } from "./types/game";

export const canCardBeDroppedOnToColumn = (target: SolitaireCard, drag: SolitaireCard): boolean => {    
    /**
     * If the color of the current card
     * is the same then its not allowed 
     * to drop 
     */
    if (target.color === drag.color) {
        return false;
    }

    /**
     * If the drag card is the one index below the
     * target
     */
    return target.index === drag.index - 1;
};

export const canCardBeDroppedOnToFinal = (drag: SolitaireCard, suit: SUIT, cards: SolitaireCard[]): boolean => {

    /**
     * Only allow cards of this suit
     * to be dropped onto the final card pile
     */
    if (drag.suit !== suit) {
        return false;
    }

    /**
     * If the current cards length is zero
     * and the current drag card is the ACE
     * or index 0 the allow it
     */
    if (cards.length === 0 && drag.index === 0 && drag.cardNumber === 'A') {
        return true;
    }

    /**
     * If no cards are found and the above 
     * statement does not catch the ACE
     * then quit now
     */
    if (cards.length === 0) {
        return false;
    }

    /**
     * Find the last card in the cards list
     */
    const latestCard = cards[cards.length - 1];

    /**
     * Does the current card index +1 equal the card
     * being dragged in
     */
    return latestCard.index + 1 === drag.index;
};

export const canCardBeDroppedToEmptyColumn = (card: SolitaireCard) => {
    return card.cardNumber === 'K';
};