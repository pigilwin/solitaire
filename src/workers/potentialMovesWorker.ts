import { expose } from "comlink";
import { Solitaire } from "types/game";
import { PotentialMovesFromWorker } from "types/worker";

const potentialMoves = (solitaire: Solitaire): PotentialMovesFromWorker => {
    return {};
} 

const exports = {
    potentialMoves
};
export type WorkerType = typeof exports;

expose(exports);