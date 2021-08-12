import { LocationAwarePotentiallyUndefinedSolitaireCard } from "./game";

export type IsGameCompleteFromWorker = [boolean, boolean];
export type AreAllCardsOnTheBoardFromWorker = [string[], boolean];

export type PotentialClickCardMovesWorker = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard;
};

export type CanCardMoveFromWorker = LocationAwarePotentiallyUndefinedSolitaireCard | undefined;

export type PotentialMovesFromWorker = string[];