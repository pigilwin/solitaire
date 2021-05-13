import { expose } from "comlink";
import { canCardBeDroppedOnToColumn, canCardBeDroppedToEmptyColumn } from "store/game/builder/cardDropper";
import { columnFromLocation } from "store/game/builder/util";
import { makeCardLocationAware } from "store/game/locationHelper";
import { LocationAwareSolitaireCard, Solitaire, SolitaireCard } from "types/game";

const fetchTopLocationAwareCardFromList = (solitaire: Solitaire, namespace: string, area: string): LocationAwareSolitaireCard => {
    const cards = columnFromLocation(solitaire, namespace, area);
    const card = cards[cards.length - 1];
    return makeCardLocationAware(card, namespace, area);
};

const canCardMove = (solitaire: Solitaire, card: LocationAwareSolitaireCard): boolean => {

    if (!card.showing) {
        return false;
    }

    const potentialCardLocations = [
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'one'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'two'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'three'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'four'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'five'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'six'),
        fetchTopLocationAwareCardFromList(solitaire, 'columns', 'seven')
    ];

    console.log('card being checked', card.cardNumber, card.suit);

    const cards = potentialCardLocations.filter((inner: SolitaireCard) => {
        return canCardBeDroppedOnToColumn(inner, card) || canCardBeDroppedToEmptyColumn(card);
    });

    cards.forEach((card) => {
        console.log(card.cardNumber, card.suit, card.location);
    });

    return cards.length > 0;
};

const exports = {
    canCardMove
};
export type WorkerType = typeof exports;

expose(exports);