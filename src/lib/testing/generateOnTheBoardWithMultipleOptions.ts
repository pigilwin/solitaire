import { generateDeck } from "store/game/initialiseGame";
import { Game, SolitaireCard } from "types/game";
import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "types/suit";
import { v4 } from "uuid";

export const generateOnTheBoardWithMultipleOptions = (): Game => {

    const game = generateDeck().map((card) => {
        card.showing = true;
        return card;
    });

    const aceOfHearts = fetchCard(game, 'A', SUIT_TYPE_HEART);
    const aceOfSpades = fetchCard(game, 'A', SUIT_TYPE_SPADE);
    const twoOfHearts = fetchCard(game, '2', SUIT_TYPE_HEART);
    const fiveOfSpades = fetchCard(game, '5', SUIT_TYPE_SPADE);
    const sixOfSpades = fetchCard(game, '6', SUIT_TYPE_SPADE);
    const nineOfDiamonds = fetchCard(game, '9', SUIT_TYPE_DIAMOND);
    const nineOfHearts = fetchCard(game, '9', SUIT_TYPE_HEART);
    const sevenOfHearts = fetchCard(game, '7', SUIT_TYPE_HEART);
    const eightOfClubs = fetchCard(game, '8', SUIT_TYPE_CLUB);
    const eightOfSpades = fetchCard(game, '8', SUIT_TYPE_SPADE);
    const kingOfClubs = fetchCard(game, 'K', SUIT_TYPE_CLUB);

    return {
        generatedByTesting: true,
        game: {
            id: v4(),
            columns: {
                one: [sixOfSpades],
                two: [nineOfDiamonds, eightOfClubs],
                three: [sevenOfHearts],
                four: [nineOfHearts, eightOfSpades],
                five: [aceOfHearts],
                six: [twoOfHearts, aceOfSpades],
                seven: [kingOfClubs]
            },
            draw: {
               current: [],
               remaining: [] 
            },
            final: {
                club: [],
                spade: [fiveOfSpades],
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