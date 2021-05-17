import { LocationAwarePotentiallyUndefinedSolitaireCard, LocationAwareSolitaireCard, Solitaire, SolitaireCard, SolitaireColumn, SolitaireFinal } from "../types/game";

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

export const areCardsIdentical = (first: LocationAwareSolitaireCard, second: LocationAwareSolitaireCard): boolean => {
    return first.cardNumber === second.cardNumber && first.suit === second.suit && first.index === second.index;
};

export const isCardAKing = (first: SolitaireCard): boolean => {
    return first.cardNumber === 'K';
}

export const isAFullCard = (card: LocationAwarePotentiallyUndefinedSolitaireCard): boolean => {
    return card.hasOwnProperty('cardNumber');
}