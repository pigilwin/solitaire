import { v4 } from "uuid";
import { Solitaire, SolitaireCard } from "./types/game";
import {
    SUIT_TYPE_CLUB, 
    SUIT_TYPE_DIAMOND, 
    SUIT_TYPE_HEART, 
    SUIT_TYPE_SPADE 
} from "./types/suit";

const standardSuitOrder: string[] = [SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE];
const standardCardOrder: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Generate the solitaire game
 * @returns {Solitaire}
 */
export const generateGame = (): Solitaire => {
    
    /**
     * Generate the initial deck
     */
    const deck: SolitaireCard[] = generateDeck();

    /**
     * Sort the array so its actually a random game
     */
    deck.sort(() => {
        return Math.random() - 0.5;
    });

    /**
     * The complete new solitaire game instance
     */
    const solitaireDeck: Solitaire = {
        id: v4(),
        final: {
            diamond: [],
            heart: [],
            club: [],
            spade: [],
        },
        columns: {
            one: generateColumn(deck, 1),
            two: generateColumn(deck, 2),
            three: generateColumn(deck, 3),
            four: generateColumn(deck, 4),
            five: generateColumn(deck, 5),
            six: generateColumn(deck, 6),
            seven: generateColumn(deck, 7),
        },
        draw: {
            remaining: deck,
            current: []
        }
    };
    
    return solitaireDeck;
};

/**
 * Generate the column worth of content
 * @param {SolitaireCard[]} deck 
 * @param {number} amount 
 * @returns {SolitaireCard[]}
 */
const generateColumn = (deck: SolitaireCard[], amount: number): SolitaireCard[] => {
    const column = deck.splice(0, amount);
    column[column.length - 1].showing = true;
    return column;
};

/**
 * Generate the deck in standard order
 * @returns {SolitaireCard[]}
 */
const generateDeck = (): SolitaireCard[] => {

    const deck: SolitaireCard[] = [];

    standardSuitOrder.forEach((suit) => {
        standardCardOrder.forEach((card, index) => {
            deck.push({
                suit: suit,
                showing: false,
                cardNumber: card,
                index: index,
                color: [SUIT_TYPE_CLUB, SUIT_TYPE_SPADE].indexOf(suit) === -1 ? "RED": "BLACK"
            });
        });
    });

    return deck;
};