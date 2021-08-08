import { LocationAwarePotentiallyUndefinedSolitaireCard } from "./game";

export type IsGameCompleteFromWorker<T> = [T, boolean];

export type PotentialClickCardMovesWorker = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard;
};

export type CanCardMoveFromWorker = LocationAwarePotentiallyUndefinedSolitaireCard | undefined;

export type PotentialMovesFromWorker = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard;
};