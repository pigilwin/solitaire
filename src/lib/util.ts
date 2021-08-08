import { 
    LocationAware,
    LocationAwarePotentiallyUndefinedSolitaireCard, 
    LocationAwareSolitaireCard, 
    Solitaire, 
    SolitaireCard, 
    SolitaireColumn, 
    SolitaireFinal 
} from "../types/game";
import { enhanceCard } from "./enhancers/enhancers";

export const columnFromLocation = (game: Solitaire, namespace: string, area: string): SolitaireCard[] => {
    const columns: SolitaireColumn = (game[namespace as keyof Solitaire] as SolitaireColumn);
    return columns[area as keyof SolitaireColumn];
}

export const finalFromLocation = (game: Solitaire, finalColumn: string): SolitaireCard[] => {
    return (game.final[finalColumn as keyof SolitaireFinal] as SolitaireCard[]);
}

export const findIndexOfCardWithinColumn = (column: SolitaireCard[], card: LocationAwareSolitaireCard): number => {
    return column.findIndex((innerCard: SolitaireCard) => {
        return innerCard.cardNumber === card.cardNumber && innerCard.suit === card.suit;
    });
}

/**
 * Find the latest card in the column and flip it
 * @param {SolitaireCard[]} dragColumn
*/
export const flipLatestCardInColumn = (dragColumn: SolitaireCard[]): void => {
    if (dragColumn.length > 0) {
        dragColumn[dragColumn.length - 1].showing = true;
    }
}

export const makeCardLocationAware = (card: SolitaireCard, namespace: string, area: string): LocationAwareSolitaireCard => {
    return {
        location: {
            namespace,
            area
        },
        ...card
    }
}

export const fetchCard = (cards: SolitaireCard[], number: string, suit: string): SolitaireCard => {
    return cards.find((card) => {
        return card.cardNumber === number && card.suit === suit;
    }) as SolitaireCard;
}

export const makeCardIndentifier = (card: LocationAwarePotentiallyUndefinedSolitaireCard): string => {
    const enchancedCard = enhanceCard(card);
    
    if (!enchancedCard.isAFullCard()) {
        const locationOnly = (card as LocationAware).location;
        return "location-" + locationOnly.namespace + "-" + locationOnly.area;
    }
    
    const locationAwareCard = card as LocationAwareSolitaireCard;
    return "full-" + locationAwareCard.suit + "-" + locationAwareCard.cardNumber;
};