import { LocationAwareSolitaireCard, MoveCardPayload, Solitaire, SolitaireCard, SolitaireColumn } from "./types/game";

export const drawCardFromRemainingAddToDraw = (game: Solitaire): Solitaire => {
    const newGame: Solitaire = {...game};
    const latestCard = (newGame.draw.remaining.pop() as SolitaireCard);
    newGame.draw.draw.push(latestCard);
    return newGame;
}

export const moveCard = (game: Solitaire, payload: MoveCardPayload): Solitaire => {
    const newGame: Solitaire = {...game};

    if (payload.drag.location.namespace === 'draw' || payload.drag.location.namespace === 'final') {
        console.log('not implemented just yet');
        return newGame;
    }

    if (payload.drag.location.namespace === 'columns' && payload.drop.location.namespace === 'columns'){

        return moveCardBetweenColumns(newGame, payload);
    }
    
    return newGame;
}

const moveCardBetweenColumns = (game: Solitaire, payload: MoveCardPayload): Solitaire => {
    
    /**
     * Find the column from the current location
     */
    const dragColumn = columnFromLocation(game, payload.drag);

    /**
     * Find the index of the card being dragged
     */
    const dragIndex = findIndexOfCardWithinColumn(dragColumn, payload.drag);

    /**
     * If its not found then something odd is 
     * happening just return the unmodiffied game
     * unmodified
     */
    if (dragIndex === -1) {
        return game;
    }

    /**
     * Remove the cards from the index and above
     */
    const removedCards = dragColumn.splice(dragIndex);

    /**
     * Find the column from the location and attach
     * the cards being moved
     */
    columnFromLocation(game, payload.drop).push(...removedCards);

    /**
     * Find the latest card in the column and flip it
     */
    if (dragColumn.length > 0) {
        dragColumn[dragColumn.length - 1].showing = true;
    }

    return game;
};

const columnFromLocation = (game: Solitaire, locationAwareCard: LocationAwareSolitaireCard): SolitaireCard[] => {
    const columns: SolitaireColumn = (game[locationAwareCard.location.namespace as keyof Solitaire] as SolitaireColumn);
    const column: SolitaireCard[] = columns[locationAwareCard.location.area as keyof SolitaireColumn];
    return column;
}

const findIndexOfCardWithinColumn = (column: SolitaireCard[], card: LocationAwareSolitaireCard): number => {
    return column.findIndex((innerCard: SolitaireCard) => {
        return innerCard.cardNumber === card.cardNumber && innerCard.suit === card.suit;
    });
}