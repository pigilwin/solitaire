import { expose } from "comlink";
import { enhanceSolitaire } from "lib/enhancers/enhancers";
import { Solitaire } from "types/game";

const areAllCardsOnTheBoard = (solitaire: Solitaire): string[] => {
    const enhancedSolitaire = enhanceSolitaire(solitaire);
    return enhancedSolitaire.areAllCardsOnTheBoard();
};

const exports = {
    areAllCardsOnTheBoard
};
export type WorkerType = typeof exports;

expose(exports);