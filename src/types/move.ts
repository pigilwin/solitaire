import { LocationAwareSolitaireCard } from "./game";
import { CanCardMoveFromWorker } from "./worker";

export type CardWantingToBeMoved = LocationAwareSolitaireCard | null;

export interface GameMove {
    potentialMoveLocations: CanCardMoveFromWorker;
    cardWantingToBeMoved: CardWantingToBeMoved;
}

export interface PossibleMovesPayload {
    potentialMoves: CanCardMoveFromWorker;
    cardWantingToBeMoved: CardWantingToBeMoved;
}