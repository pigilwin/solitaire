import { LocationAwarePotentiallyUndefinedSolitaireCard } from "./game";

export type IsGameCompleteFromWorker<T> = [T, boolean];

export type CanCardMoveFromWorker = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard;
};