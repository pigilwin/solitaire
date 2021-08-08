import { expose } from "comlink";
import { columnFromLocation, finalFromLocation, makeCardIndentifier, makeCardLocationAware } from "lib/util";
import { LocationAwarePotentiallyUndefinedSolitaireCard, Solitaire } from "types/game";
import { PotentialMovesFromWorker } from "types/worker";
import { canCardMoveToCard } from "./cardMoves";

type Cards = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard[];
};

type CardsForTop = {
    [id: string]: LocationAwarePotentiallyUndefinedSolitaireCard;
};

const loadCardsFromLocation = (solitaire: Solitaire): Cards => {
    const cards: Cards = {};
    
    /**
     * Load in the cards from the columns
     */
    for (const key in solitaire.columns) {
        cards[key] = [];
        const cardsForColumn = columnFromLocation(solitaire, 'columns', key).filter((card) => {
            return card.showing;
        }).map((card) => {
            return makeCardLocationAware(card, 'columns', key);
        });

        if (cardsForColumn.length === 0) {
            cards[key].push({
                location: {
                    namespace: 'columns',
                    area: key
                }
            });
            continue;
        }
        cards[key] = cardsForColumn;
    }

    /**
     * Load in the cards from the final
     */
    for (const key in solitaire.final) {
        cards[key] = [];
        const cardsOnFinal = finalFromLocation(solitaire, key);
        if (cardsOnFinal.length === 0) {
            cards[key].push({
                location: {
                    namespace: 'final',
                    area: key
                }
            });
            continue;
        }
        const lastCard = cardsOnFinal[cardsOnFinal.length - 1];
        cards[key].push(makeCardLocationAware(lastCard, 'final', key));
    }

    return cards;
};

const findAllCardsThatAreOnTheBottomWithoutColumn = (cards: Cards, column: string): CardsForTop => {
    const foundCards: CardsForTop = {};

    for (const key in cards) {
        const cardsForKey = cards[key];

        /**
         * If the current column is the same as the key then continue
         */
        if (key === column) {
            continue;
        }

        foundCards[key] = cardsForKey[cardsForKey.length -1];
    }

    return foundCards;
};

const potentialMoves = (solitaire: Solitaire): PotentialMovesFromWorker => {
    const moves: PotentialMovesFromWorker = {};
    const cards = loadCardsFromLocation(solitaire);
    
    /**
     * Loop over every column in the 
     * list of currently shown cards
     */
    for (const column in cards) {

        const allCardsThatAreOnTheBottomWithoutThisColumn = findAllCardsThatAreOnTheBottomWithoutColumn(cards, column);
        
        for (const card of cards[column]) {
            const cardIdentifier = makeCardIndentifier(card);
            for (const cardInnerLocation in allCardsThatAreOnTheBottomWithoutThisColumn) {
                const cardInner = allCardsThatAreOnTheBottomWithoutThisColumn[cardInnerLocation];

                if (cardInner === undefined) {
                    console.log(column, cardInnerLocation);
                }

                if (canCardMoveToCard(solitaire, card, cardInner)) {
                    if (moves[column] === undefined) {
                        moves[column] = {};
                    }
                    if (moves[column][cardIdentifier] === undefined) {
                        moves[column][cardIdentifier] = [];
                    }
                    moves[column][cardIdentifier].push(makeCardIndentifier(cardInner));
                }
            }
        }
    }

    return moves;
} 

const exports = {
    potentialMoves
};
export type WorkerType = typeof exports;

expose(exports);