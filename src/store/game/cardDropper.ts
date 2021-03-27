import { SolitaireCard } from "./suitTypes";

export const canCardBeDroppedOnToColumn = (target: SolitaireCard, drag: SolitaireCard): boolean => {

    if (!target.showing) {
        return false;
    }

    if (!drag.showing) {
        return false;
    }

    /**
     * If the color of the current card
     * is the same then its not allowed 
     * to drop 
     */
    if (target.color === drag.color) {
        return false;
    }

    return target.index === drag.index - 1;
};