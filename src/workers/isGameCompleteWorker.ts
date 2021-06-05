import { expose } from 'comlink';
import { enhanceSolitaire } from 'lib/enhancers/enhancers';
import { Solitaire } from "types/game";

const isGameComplete = (solitaire: Solitaire): boolean => {
    const enhancedSolitaire = enhanceSolitaire(solitaire);
    return enhancedSolitaire.isGameComplete();
};

const exports = {
    isGameComplete
};
export type WorkerType = typeof exports;

expose(exports);