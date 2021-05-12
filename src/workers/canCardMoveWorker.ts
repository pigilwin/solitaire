import { expose } from "comlink";
import { Solitaire } from "types/game";

const canCardMove = (solitaire: Solitaire): boolean => {
    return false;
};

const exports = {
    canCardMove
};
export type WorkerType = typeof exports;

expose(exports);