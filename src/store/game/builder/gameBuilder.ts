import { MoveCardPayload, Solitaire, SolitaireCard } from "../types/game";
import { columnFromLocation, findIndexOfCardWithinColumn, flipLatestCardInColumn } from "./util";

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
    flipLatestCardInColumn(dragColumn);

    return game;
};