import { LocationAwareSolitaireCard, MoveCardPayload, MoveCardToEmptyColumnPayload, MoveCardToFinalColumnPayload, Solitaire, SolitaireCard, SolitaireColumn, SolitaireFinal } from "./types/game";

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
    const dragColumn = columnFromLocation(game, payload.drag.location.namespace, payload.drag.location.area);

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
    columnFromLocation(game, payload.drop.location.namespace, payload.drop.location.area).push(...removedCards);

    /**
     * Find the latest card in the column and flip it
     */
    if (dragColumn.length > 0) {
        dragColumn[dragColumn.length - 1].showing = true;
    }

    return game;
};

export const moveCardToEmptyColumn = (game: Solitaire, payload: MoveCardToEmptyColumnPayload): Solitaire => {

    const emptyColumn = columnFromLocation(game, 'columns', payload.column);

    /**
     * Find the column from the current location
     */
    const dragColumn = columnFromLocation(game, payload.drag.location.namespace, payload.drag.location.area);

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
     * Add the removed cards
     */
    emptyColumn.push(...removedCards);

    return game;
}

export const moveCardToFinalColumn = (game: Solitaire, payload: MoveCardToFinalColumnPayload): Solitaire => {
    
    /**
     * Find the column from the current location
     */
    const dragColumn = columnFromLocation(game, payload.drag.location.namespace, payload.drag.location.area);

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
     * Append the card to the column
     */
    finalFromLocation(game, payload.column).push(...removedCards);

    /**
     * Find the latest card in the column and flip it
    */
    if (dragColumn.length > 0) {
        dragColumn[dragColumn.length - 1].showing = true;
    }

    return game;
}

const columnFromLocation = (game: Solitaire, namespace: string, area: string): SolitaireCard[] => {
    const columns: SolitaireColumn = (game[namespace as keyof Solitaire] as SolitaireColumn);
    const column: SolitaireCard[] = columns[area as keyof SolitaireColumn];
    return column;
}

const finalFromLocation = (game: Solitaire, finalColumn: string): SolitaireCard[] => {
    return (game.final[finalColumn as keyof SolitaireFinal] as SolitaireCard[]);
}

const findIndexOfCardWithinColumn = (column: SolitaireCard[], card: LocationAwareSolitaireCard): number => {
    return column.findIndex((innerCard: SolitaireCard) => {
        return innerCard.cardNumber === card.cardNumber && innerCard.suit === card.suit;
    });
}