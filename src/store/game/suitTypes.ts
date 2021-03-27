export const SUIT_TYPE_SPADE: string = 'SPADE';
export const SUIT_TYPE_HEART: string = 'HEART';
export const SUIT_TYPE_DIAMOND: string = 'DIAMOND';
export const SUIT_TYPE_CLUB: string = 'CLUB';

export type SUIT = typeof SUIT_TYPE_SPADE | typeof SUIT_TYPE_CLUB | typeof SUIT_TYPE_DIAMOND | typeof SUIT_TYPE_HEART;
export type COLOR = "RED" | "BLACK";

export interface Game {
    game: Solitaire | null;
}

export interface Solitaire {
    id: string;
    score: number;
    start: number;
    end: number;
    one: SolitaireCard[];
    two: SolitaireCard[];
    three: SolitaireCard[];
    four: SolitaireCard[];
    five: SolitaireCard[];
    six: SolitaireCard[];
    seven: SolitaireCard[];
    diamond: SolitaireCard[];
    heart: SolitaireCard[];
    spade: SolitaireCard[];
    club: SolitaireCard[];
    draw: SolitaireCard[];
}

export interface SolitaireCard {
    suit: SUIT;
    cardNumber: string;
    showing: boolean;
    index: number;
    color: COLOR;
}