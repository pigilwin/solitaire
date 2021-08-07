import { LocationAwarePotentiallyUndefinedSolitaireCard } from "./game";

export type IsGameCompleteFromWorker<T> = [T, boolean];

export type PotentialCardMovesWorker = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard;
};
export type CanCardMoveFromWorker = LocationAwarePotentiallyUndefinedSolitaireCard | undefined;