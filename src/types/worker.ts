import { LocationAwarePotentiallyUndefinedSolitaireCard } from "./game";

export type IsGameCompleteFromWorker = boolean;
export type AreAllCardsOnTheBoardFromWorker = string[];

export type PotentialClickCardMovesWorker = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard;
};

export type CanCardMoveFromWorker = LocationAwarePotentiallyUndefinedSolitaireCard | undefined;

export type PotentialMovesFromWorker = string[];