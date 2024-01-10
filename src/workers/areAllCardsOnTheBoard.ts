import { expose } from "comlink";
import { enhanceSolitaire } from "../lib/enhancers/solitaireEnhancer";
import { Solitaire } from "typings/game";

const areAllCardsOnTheBoard = (solitaire: Solitaire): string[] => {
    const enhancedSolitaire = enhanceSolitaire(solitaire);
    return enhancedSolitaire.areAllCardsOnTheBoard();
};

const exports = {
    areAllCardsOnTheBoard
};
export type WorkerType = typeof exports;

expose(exports);