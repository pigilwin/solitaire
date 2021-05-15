import { v4 } from "uuid";
import { generateDeck } from "../initialiseGame";
import { Game, SolitaireCard } from "../../../types/game";
import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "../../../types/suit";

export const generateOneMoveAwayGame = (): Game => {

    const game = generateDeck().map((card) => {
        card.showing = true;
        return card;
    });
    const diamonds = game.filter(card => card.suit === SUIT_TYPE_DIAMOND);
    const hearts = game.filter(card => card.suit === SUIT_TYPE_HEART);
    const spades = game.filter(card => card.suit === SUIT_TYPE_SPADE);
    const clubs = game.filter(card => card.suit === SUIT_TYPE_CLUB);
    const remaining = (clubs.pop() as SolitaireCard);
    remaining.showing = true;

    return {
        potentialMoveLocations: [],
        generatedByTesting: true,
        game: {
            id: v4(),
            columns: {
                one: [remaining],
                two: [],
                three: [],
                four: [],
                five: [],
                six: [],
                seven: []
            },
            draw: {
               current: [],
               remaining: [] 
            },
            final: {
                club: clubs,
                spade: spades,
                heart: hearts,
                diamond: diamonds
            }
        }
    };
};