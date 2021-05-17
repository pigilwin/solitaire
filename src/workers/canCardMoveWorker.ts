import { expose } from "comlink";
import { columnFromLocation } from "store/game/builder/util";
import { makeCardLocationAware } from "store/game/locationHelper";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";

type PotentiallyUndefinedLocationAwareSolitaireCard = LocationAwareSolitaireCard | undefined;

const fetchTopLocationAwareCardFromList = (solitaire: Solitaire, namespace: string, area: string): PotentiallyUndefinedLocationAwareSolitaireCard => {
    const cards = columnFromLocation(solitaire, namespace, area);
    const card = cards[cards.length - 1];
    
    if (card === undefined) {
        return undefined;
    }

    return makeCardLocationAware(card, namespace, area);
};

const areCardsIdentical = (first: LocationAwareSolitaireCard, second: LocationAwareSolitaireCard) => {
    return first.cardNumber === second.cardNumber && first.suit === second.suit && first.index === second.index;
};

const canCardMove = (solitaire: Solitaire, card: LocationAwareSolitaireCard): LocationAwareSolitaireCard[] => {
    const potentialCardLocations = [
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'one'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'two'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'three'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'four'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'five'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'six'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'seven')
    ];

    /**
     * Filter out the undefined from the list of cards
     */
    const potentialCardLocationsWithUndefinedRemoved = potentialCardLocations.filter((inner: PotentiallyUndefinedLocationAwareSolitaireCard): inner is LocationAwareSolitaireCard => {
        return inner !== undefined;
    });

    /**
     * Filter out the cards that are not needed
     */
    const cards = potentialCardLocationsWithUndefinedRemoved.filter((inner: LocationAwareSolitaireCard) => {
        
        /**
         * If the cards are indentical then it 
         * can't be moved to this stack
         */
        if (areCardsIdentical(inner, card)) {
            return false;
        }

        /**
         * If the cards are of the same
         * color then these can't be
         * transferred
         */
        if (inner.color === card.color) {
            return false;
        }

        /**
         * If the cards are compatible then
         * allow the cards to be selected
         */
        if (inner.index === card.index + 1) {
            return true;
        }

        return false;
    });

    return cards;
};

const exports = {
    canCardMove
};
export type WorkerType = typeof exports;

expose(exports);