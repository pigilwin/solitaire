import { MoveCardPayload, Solitaire, SolitaireCard } from "../types/game";
import { columnFromLocation, findIndexOfCardWithinColumn, flipLatestCardInColumn } from "./util";

export const drawCardFromRemainingAddToDraw = (game: Solitaire): Solitaire => {
    const newGame: Solitaire = {...game};
    const latestCard = (newGame.draw.remaining.pop() as SolitaireCard);
    latestCard.showing = true;
    newGame.draw.current.push(latestCard);
    return newGame;
}

export const refreshRemaningFromDraw = (game: Solitaire): Solitaire => {
    const newGame: Solitaire = {...game};
    
    /**
     * Take all existing remaining cards and hide them
     */
    const remaining = newGame.draw.current.map((card) => {
        card.showing = false;
        return card;
    }).reverse();

    newGame.draw.current = [];
    newGame.draw.remaining = remaining;

    return newGame;
}

export const moveCard = (game: Solitaire, payload: MoveCardPayload): Solitaire => {
    const newGame: Solitaire = {...game};

    const dragNamespace = payload.drag.location.namespace;
    const dropNamespace = payload.drop.location.namespace;

    /**
     * If the drag and drop namespace is both related to columns
     */
    if (dragNamespace === 'columns' && dropNamespace === 'columns'){
        return moveCardBetweenColumns(newGame, payload);
    }

    /**
     * Move the card from the draw to the columns
     */
    if (dragNamespace === 'draw' && dropNamespace === 'columns') {
        return moveCardFromDrawToColumn(newGame, payload);
    }

    /**
     * Move the card from the draw to the columns
     */
     if (dragNamespace === 'final' && dropNamespace === 'columns') {
        return moveCardFromFinalToColumn(newGame, payload);
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

const moveCardFromDrawToColumn = (game: Solitaire, payload: MoveCardPayload): Solitaire => {
    /**
     * If the draw length is zero then this current action is not possible
     */
    if (game.draw.current.length === 0) {
        return game;
    }

    /**
     * Find the latest card on the draw
     */
    const latestCardOnDraw = game.draw.current.pop();

    /**
     * If the latest card on the draw is undefined then exit out
     */
    if (latestCardOnDraw === undefined){
        return game;
    }


    /**
     * Find the column from the location and attach
     * the card being moved from the draw
    */
    columnFromLocation(game, payload.drop.location.namespace, payload.drop.location.area).push(latestCardOnDraw);

    return game;
}

export const moveCardFromFinalToColumn = (game: Solitaire, payload: MoveCardPayload): Solitaire => {
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

    return game;
}