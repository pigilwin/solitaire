import { expose } from "comlink";
import { areCardsIdentical, columnFromLocation, isAFullCard, isCardAKing, makeCardLocationAware } from "lib/util";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";
import { CanCardMoveFromWorker } from "types/worker";

const fetchTopLocationAwareCardFromList = (
    build: CanCardMoveFromWorker,  
    solitaire: Solitaire, 
    namespace: string, 
    area: string
): void => {
    const cards = columnFromLocation(solitaire, namespace, area);
    const card = cards[cards.length - 1];
    
    if (card === undefined) {
        build[area] = {
            location: {
                namespace,
                area
            }
        };
    }

    build[area] = makeCardLocationAware(card, namespace, area);
};

const canCardMove = (solitaire: Solitaire, card: LocationAwareSolitaireCard): CanCardMoveFromWorker => {
    let potentialCardLocations: CanCardMoveFromWorker = {};

    fetchTopLocationAwareCardFromList(potentialCardLocations, solitaire, 'columns', 'one');
    fetchTopLocationAwareCardFromList(potentialCardLocations, solitaire, 'columns', 'two');
    fetchTopLocationAwareCardFromList(potentialCardLocations, solitaire, 'columns', 'three');
    fetchTopLocationAwareCardFromList(potentialCardLocations, solitaire, 'columns', 'four');
    fetchTopLocationAwareCardFromList(potentialCardLocations, solitaire, 'columns', 'five');
    fetchTopLocationAwareCardFromList(potentialCardLocations, solitaire, 'columns', 'six');
    fetchTopLocationAwareCardFromList(potentialCardLocations, solitaire, 'columns', 'seven');

    const keysToRemove: string[] = [];

    /**
     * Filter out the cards that are not needed
     */
    for(const key in potentialCardLocations) {
        const inner = potentialCardLocations[key];

        /**
         * If the card we have clicked on is of type king
         */
        if (isCardAKing(card)) {
            /**
             * The current card we are looping over has only a 
             * location, then this is a empty space.
             */
            if (isAFullCard(inner)){
                keysToRemove.push(inner.location.area);
            }

            continue;
        }

        const cardToCheck = inner as LocationAwareSolitaireCard;

        /**
         * If the cards are indentical then it 
         * can't be moved to this stack
         */
        if (areCardsIdentical(cardToCheck, card)) {
            keysToRemove.push(inner.location.area);
            continue;
        }

        /**
         * If the cards are of the same
         * color then these can't be
         * transferred
         */
        if (cardToCheck.color === card.color) {
            keysToRemove.push(inner.location.area);
            continue;
        }

        /**
         * If the cards are compatible then
         * allow the cards to be selected
         */
        if (cardToCheck.index !== card.index + 1) {
            keysToRemove.push(inner.location.area);
            continue;
        }
    }

    /**
     * Remove the keys that are not required
     */
    for (const key of keysToRemove) {
        delete potentialCardLocations[key];
    }

    return potentialCardLocations;
};

const exports = {
    canCardMove
};
export type WorkerType = typeof exports;

expose(exports);