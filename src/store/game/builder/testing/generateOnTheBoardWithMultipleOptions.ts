import { generateDeck } from "store/game/initialiseGame";
import { Game, SolitaireCard } from "types/game";
import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "types/suit";
import { v4 } from "uuid";

export const generateOnTheBoardWithMultipleOptions = (): Game => {

    const game = generateDeck().map((card) => {
        card.showing = true;
        return card;
    });

    const nineOfDiamonds = fetchCard(game, '9', SUIT_TYPE_DIAMOND);
    const nineOfHearts = fetchCard(game, '9', SUIT_TYPE_HEART);
    const sevenOfHearts = fetchCard(game, '7', SUIT_TYPE_HEART);
    const eightOfClubs = fetchCard(game, '8', SUIT_TYPE_CLUB);
    const eightOfSpades = fetchCard(game, '8', SUIT_TYPE_SPADE);

    return {
        potentialMoveLocations: [],
        generatedByTesting: true,
        game: {
            id: v4(),
            columns: {
                one: [],
                two: [nineOfDiamonds, eightOfClubs],
                three: [sevenOfHearts],
                four: [nineOfHearts, eightOfSpades],
                five: [],
                six: [],
                seven: []
            },
            draw: {
               current: [],
               remaining: [] 
            },
            final: {
                club: [],
                spade: [],
                heart: [],
                diamond: []
            }
        }
    };
}

const fetchCard = (cards: SolitaireCard[], number: string, suit: string): SolitaireCard => {
    return cards.find((card) => {
        return card.cardNumber === number && card.suit === suit;
    }) as SolitaireCard;
};