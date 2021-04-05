import { MoveCardToEmptyColumnPayload, Solitaire } from "../types/game";
import { columnFromLocation, findIndexOfCardWithinColumn, flipLatestCardInColumn } from "./util";

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

    /**
     * Flip the latest card in the drag column
     */
    flipLatestCardInColumn(dragColumn);

    return game;
}