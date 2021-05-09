import { expose } from 'comlink';
import { Solitaire, SolitaireCard } from "types/game";

const isGameComplete = (solitaire: Solitaire): boolean => {
    const cardIndexFromLocation = (cards: SolitaireCard[]): string => {

        if (cards.length === 0) {
            return '';
        }
        return cards[cards.length - 1].cardNumber;
    }

    const lastCardInFinalLocation = [
        cardIndexFromLocation(solitaire.final.club),
        cardIndexFromLocation(solitaire.final.spade),
        cardIndexFromLocation(solitaire.final.diamond),
        cardIndexFromLocation(solitaire.final.heart)
    ];

    const lastCardInFinalLocationAsKing = lastCardInFinalLocation.filter(type => type === 'K');

    return lastCardInFinalLocation.length === lastCardInFinalLocationAsKing.length;
};

const exports = {
    isGameComplete
};
export type WorkerType = typeof exports;

expose(exports);