import { expose } from "comlink";
import { canCardBeDroppedOnToColumn, canCardBeDroppedToEmptyColumn } from "store/game/builder/cardDropper";
import { makeCardLocationAware } from "store/game/locationHelper";
import { LocationAwareSolitaireCard, Solitaire, SolitaireCard } from "types/game";

const fetchTopLocationAwareCardFromList = (cards: SolitaireCard[], namespace: string, area: string): LocationAwareSolitaireCard => {
    const card = cards[cards.length - 1];
    return makeCardLocationAware(card, namespace, area);
};

const canCardMove = (solitaire: Solitaire, card: LocationAwareSolitaireCard): boolean => {

    if (!card.showing) {
        return false;
    }

    const potentialCardLocations = [
        fetchTopLocationAwareCardFromList(solitaire.draw.current, 'draw', 'current'),
        fetchTopLocationAwareCardFromList(solitaire.columns.one, 'columns', 'one'),
        fetchTopLocationAwareCardFromList(solitaire.columns.two, 'columns', 'two'),
        fetchTopLocationAwareCardFromList(solitaire.columns.three, 'columns', 'three'),
        fetchTopLocationAwareCardFromList(solitaire.columns.four, 'columns', 'four'),
        fetchTopLocationAwareCardFromList(solitaire.columns.five, 'columns', 'five'),
        fetchTopLocationAwareCardFromList(solitaire.columns.six, 'columns', 'six'),
        fetchTopLocationAwareCardFromList(solitaire.columns.seven, 'columns', 'seven')
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