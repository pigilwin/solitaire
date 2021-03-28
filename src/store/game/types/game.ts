import { COLOR, SUIT } from "./suit";

export interface Solitaire {
    id: string;
    score: number;
    start: number;
    end: number;
    columns: SolitaireColumn;
    final: SolitaireFinal;
    draw: SolitaireDraw;
}

export interface SolitaireCard {
    suit: SUIT;
    cardNumber: string;
    showing: boolean;
    index: number;
    color: COLOR;
}

export interface ColumnAwareSolitaireCard extends SolitaireCard {
    column: string;
}

export interface SolitaireFinal {
    diamond: SolitaireCard[];
    heart: SolitaireCard[];
    spade: SolitaireCard[];
    club: SolitaireCard[];
}

export interface SolitaireDraw {
    draw: SolitaireCard[];
    remaining: SolitaireCard[];
}

export interface SolitaireColumn {
    one: SolitaireCard[];
    two: SolitaireCard[];
    three: SolitaireCard[];
    four: SolitaireCard[];
    five: SolitaireCard[];
    six: SolitaireCard[];
    seven: SolitaireCard[];
}

export interface Game {
    game: Solitaire;
}

export interface MoveCardToColumnPayload {
    drop: ColumnAwareSolitaireCard;
    drag: ColumnAwareSolitaireCard;
    column: string;
}