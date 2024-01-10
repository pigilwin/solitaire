import { fetchCard } from "lib/util";
import { generateDeck } from "store/game/initialiseGame";
import { Game } from "typings/game";
import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "typings/suit";
import { v4 } from "uuid";

export const generateOnTheBoardWithMultipleOptions = (): Game => {

    const game = generateDeck().map((card) => {
        card.showing = true;
        return card;
    });

    const aceOfHearts = fetchCard(game, 'A', SUIT_TYPE_HEART);
    const aceOfSpades = fetchCard(game, 'A', SUIT_TYPE_SPADE);
    const twoOfHearts = fetchCard(game, '2', SUIT_TYPE_HEART);
    const twoOfSpades = fetchCard(game, '2', SUIT_TYPE_SPADE);
    const fiveOfClubs = fetchCard(game, '5', SUIT_TYPE_CLUB);
    const sixOfClubs = fetchCard(game, '6', SUIT_TYPE_CLUB);
    const sevenOfHearts = fetchCard(game, '7', SUIT_TYPE_HEART);
    const eightOfClubs = fetchCard(game, '8', SUIT_TYPE_CLUB);
    const eightOfSpades = fetchCard(game, '8', SUIT_TYPE_SPADE);
    const nineOfDiamonds = fetchCard(game, '9', SUIT_TYPE_DIAMOND);
    const nineOfHearts = fetchCard(game, '9', SUIT_TYPE_HEART);
    const kingOfClubs = fetchCard(game, 'K', SUIT_TYPE_CLUB);

    return {
        game: {
            id: v4(),
            columns: {
                one: [sixOfClubs],
                two: [nineOfDiamonds, eightOfClubs],
                three: [sevenOfHearts],
                four: [nineOfHearts, eightOfSpades],
                five: [twoOfSpades, aceOfHearts],
                six: [twoOfHearts, aceOfSpades],
                seven: [kingOfClubs]
            },
            draw: {
               current: [],
               remaining: [] 
            },
            final: {
                club: [fiveOfClubs],
                spade: [],
                heart: [],
                diamond: []
            }
        }
    };
}