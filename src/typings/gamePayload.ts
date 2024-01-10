import { LocationAwareSolitaireCard } from "./game";

export interface MoveCardPayload {
    drop: LocationAwareSolitaireCard;
    drag: LocationAwareSolitaireCard;
}

export interface MoveCardToEmptyColumnPayload {
    drag: LocationAwareSolitaireCard;
    column: string;
}

export interface MoveCardToFinalColumnPayload {
    drag: LocationAwareSolitaireCard;
    column: string;
}