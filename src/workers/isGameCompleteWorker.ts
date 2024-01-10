import { expose } from 'comlink';
import { Solitaire } from "@typings/game";
import { enhanceSolitaire } from '../lib/enhancers/solitaireEnhancer';

const isGameComplete = (solitaire: Solitaire): boolean => {
    const enhancedSolitaire = enhanceSolitaire(solitaire);
    return enhancedSolitaire.isGameComplete();
};

const exports = {
    isGameComplete
};
export type WorkerType = typeof exports;

expose(exports);