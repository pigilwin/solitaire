export const SUIT_TYPE_SPADE: string = 'SPADE';
export const SUIT_TYPE_HEART: string = 'HEART';
export const SUIT_TYPE_DIAMOND: string = 'DIAMOND';
export const SUIT_TYPE_CLUB: string = 'CLUB';

export type SUIT = typeof SUIT_TYPE_SPADE | typeof SUIT_TYPE_CLUB | typeof SUIT_TYPE_DIAMOND | typeof SUIT_TYPE_HEART;

export interface Game {
    game: Solitaire;
}

export interface Solitaire {
    id: string;
    score: number;
    start: number;
    end: number;
    first: SolitaireCard[];
    second: SolitaireCard[];
    third: SolitaireCard[];
    fourth: SolitaireCard[];
    five: SolitaireCard[];
    sixth: SolitaireCard[];
    seventh: SolitaireCard[];
    diamond: SolitaireCard[];
    heart: SolitaireCard[];
    spade: SolitaireCard[];
    club: SolitaireCard[];
    draw: SolitaireCard[];
}

export interface SolitaireCard {
    suit: SUIT;
    index: string;
    showing: boolean;
}