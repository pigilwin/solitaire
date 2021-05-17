import { COLOR, SUIT } from "./suit";

export interface Solitaire {
    id: string;
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

export interface LocationAware {
    location: {
        namespace: string;
        area: string;
    };
}

export interface LocationAwareSolitaireCard extends SolitaireCard, LocationAware {}

export type LocationAwarePotentiallyUndefinedSolitaireCard = LocationAwareSolitaireCard | LocationAware;
export interface SolitaireFinal {
    diamond: SolitaireCard[];
    heart: SolitaireCard[];
    spade: SolitaireCard[];
    club: SolitaireCard[];
}

export interface SolitaireDraw {
    current: SolitaireCard[];
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
    generatedByTesting: boolean;
}