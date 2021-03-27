export const SUIT_TYPE_SPADE: string = 'SPADE';
export const SUIT_TYPE_HEART: string = 'HEART';
export const SUIT_TYPE_DIAMOND: string = 'DIAMOND';
export const SUIT_TYPE_CLUB: string = 'CLUB';

export type SUIT = typeof SUIT_TYPE_SPADE | typeof SUIT_TYPE_CLUB | typeof SUIT_TYPE_DIAMOND | typeof SUIT_TYPE_HEART;
export type COLOR = "RED" | "BLACK";

export interface Game {
    game: Solitaire | null;
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