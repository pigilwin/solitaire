import { v4 } from "uuid";
import { 
    Solitaire, 
    SolitaireCard, 
    SUIT_TYPE_CLUB, 
    SUIT_TYPE_DIAMOND, 
    SUIT_TYPE_HEART, 
    SUIT_TYPE_SPADE 
} from "./suitTypes";

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
        start: 0,
        end: 0,
        score: 0,
        diamond: [],
        heart: [],
        club: [],
        spade: [],
        first: generateColumn(deck, 1),
        second: generateColumn(deck, 2),
        third: generateColumn(deck, 3),
        fourth: generateColumn(deck, 4),
        five: generateColumn(deck, 5),
        sixth: generateColumn(deck, 6),
        seventh: generateColumn(deck, 7),
        draw: deck
    };
    
    return solitaireDeck;
};

/**
 * Generate the column worth of content
 * @param {SolitaireCard[]} deck 
 * @param {number} amount 
 * @returns {SolitaireCard[]}
 */
export const generateColumn = (deck: SolitaireCard[], amount: number): SolitaireCard[] => {
    const column = deck.splice(0, amount);
    column[column.length - 1].showing = true;
    return column;
};

/**
 * Generate the deck in standard order
 * @returns {SolitaireCard[]}
 */
export const generateDeck = (): SolitaireCard[] => {

    const deck: SolitaireCard[] = [];
    
    const order: string[] = generateStandardSuitOrder();

    [SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE].forEach((suit) => {
        order.forEach((card) => {
            deck.push({
                suit: suit,
                index: card,
                showing: false
            });
        });
    });

    return deck;
};

/**
 * Generate the standard suit order
 * @returns {string[]}
 */
export const generateStandardSuitOrder = (): string[] => {
    return ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
};