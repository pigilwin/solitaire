import { LocationAwareSolitaireCard } from "./game";

export type CardWantingToBeMoved = LocationAwareSolitaireCard | null;

export interface GameMove {
    potentialMoveLocations: LocationAwareSolitaireCard[],
    cardWantingToBeMoved: CardWantingToBeMoved
}

export interface PossibleMovesPayload {
    potentialMoves: LocationAwareSolitaireCard[],
    cardWantingToBeMoved: CardWantingToBeMoved
}