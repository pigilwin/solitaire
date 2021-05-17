import { Solitaire } from "types/game";
import { MoveCardToFinalColumnPayload } from "types/gamePayload";
import { columnFromLocation, finalFromLocation, findIndexOfCardWithinColumn, flipLatestCardInColumn } from "../../../lib/util";

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
     * Flip the latest card in the column
     */
    flipLatestCardInColumn(dragColumn);

    return game;
}