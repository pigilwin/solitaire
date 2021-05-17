import { expose } from "comlink";
import { areCardsIdentical, columnFromLocation, finalFromLocation, isAFullCard, isCardAAce, isCardAKing, makeCardLocationAware } from "lib/util";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";
import { CanCardMoveFromWorker } from "types/worker";

const fetchTopLocationAwareCardFromColumns = (
    build: CanCardMoveFromWorker,  
    solitaire: Solitaire,
    area: string
): void => {
    const cards = columnFromLocation(solitaire, 'columns', area);
    const card = cards[cards.length - 1];
    
    if (card === undefined) {
        build[area] = {
            location: {
                namespace: 'columns',
                area
            }
        };
    }

    build[area] = makeCardLocationAware(card, 'columns', area);
};

const fetchTopLocationAwareCardFromFinal = (
    build: CanCardMoveFromWorker,  
    solitaire: Solitaire,
    area: string
): void => {
    const cards = finalFromLocation(solitaire, area);
    const card = cards[cards.length - 1];
    
    if (card === undefined) {
        build[area] = {
            location: {
                namespace: 'final',
                area
            }
        };
    }

    build[area] = makeCardLocationAware(card, 'final', area);
};

const canCardMove = (solitaire: Solitaire, card: LocationAwareSolitaireCard): CanCardMoveFromWorker => {
    let potentialCardLocations: CanCardMoveFromWorker = {};

    fetchTopLocationAwareCardFromColumns(potentialCardLocations, solitaire, 'one');
    fetchTopLocationAwareCardFromColumns(potentialCardLocations, solitaire, 'two');
    fetchTopLocationAwareCardFromColumns(potentialCardLocations, solitaire, 'three');
    fetchTopLocationAwareCardFromColumns(potentialCardLocations, solitaire, 'four');
    fetchTopLocationAwareCardFromColumns(potentialCardLocations, solitaire, 'five');
    fetchTopLocationAwareCardFromColumns(potentialCardLocations, solitaire, 'six');
    fetchTopLocationAwareCardFromColumns(potentialCardLocations, solitaire, 'seven');

    fetchTopLocationAwareCardFromFinal(potentialCardLocations, solitaire, 'diamond');
    fetchTopLocationAwareCardFromFinal(potentialCardLocations, solitaire, 'heart');
    fetchTopLocationAwareCardFromFinal(potentialCardLocations, solitaire, 'club');
    fetchTopLocationAwareCardFromFinal(potentialCardLocations, solitaire, 'spade');

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
                continue;
            }

            /**
             * If the current card we are looping over has only a
             * location and this is final it needs to be removed
             */
            if (inner.location.namespace === 'final') {
                keysToRemove.push(inner.location.area);
                continue;
            }

            continue;
        }
        /**
         * If the card we have clicked on is of type ace
         */
        if (isCardAAce(card)) {
            /**
             * The current card we are looping over has only a 
             * location, then this is a empty space.
             */
            if (isAFullCard(inner)){
                keysToRemove.push(inner.location.area);
                continue;
            }

            /**
             * If the current card we are looping over has only a
             * location and this is columns it needs to be removed
             */
            if (inner.location.namespace === 'columns') {
                keysToRemove.push(inner.location.area);
                continue;
            }

            /**
             * If the location of the final is not of the same suit then remove
             */
            if (inner.location.area !== card.suit.toLowerCase()) {
                keysToRemove.push(inner.location.area);
                continue;
            }

            continue;
        }

        const cardToCheck = inner as LocationAwareSolitaireCard;

        /**
         * If both the suits match and the card index is the next one in line
         */
        if (cardToCheck.location.namespace === 'final' && cardToCheck.index + 1 === card.index && card.suit === cardToCheck.suit) {
            continue;
        }

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

    console.log(keysToRemove);

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