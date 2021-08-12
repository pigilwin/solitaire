import { generateDeck } from "store/game/initialiseGame";
import { Game } from "types/game";
import { fetchCard } from "lib/util";
import { SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE, SUIT_TYPE_CLUB } from "types/suit";
import { v4 } from "uuid";

export const generateFullBoardWithKingDraw = (): Game => {
    
    const deck = generateDeck().map((card) => {
        card.showing = true;
        return card;
    });
    return {
        hasGameBeenAskedToBeCompleted: false,
        cardOrderToCompleteGame: [],
        game: {
            id: v4(),
            columns: {
                one: [
                    fetchCard(deck, '2', SUIT_TYPE_HEART),
                    fetchCard(deck, 'A', SUIT_TYPE_CLUB)
                ],
                two: [
                    fetchCard(deck, '7', SUIT_TYPE_HEART),
                    fetchCard(deck, '6', SUIT_TYPE_SPADE)
                ],
                three: [
                    fetchCard(deck, 'J', SUIT_TYPE_CLUB),
                ],
                four: [
                    fetchCard(deck, 'Q', SUIT_TYPE_SPADE)
                ],
                five: [
                    fetchCard(deck, '8', SUIT_TYPE_DIAMOND)
                ],
                six: [
                    fetchCard(deck, '5', SUIT_TYPE_DIAMOND)
                ],
                seven: [
                    fetchCard(deck, 'K', SUIT_TYPE_HEART),
                    fetchCard(deck, 'Q', SUIT_TYPE_SPADE)
                ]
            },
            draw: {
               current: [
                   fetchCard(deck, 'K', SUIT_TYPE_DIAMOND)
               ],
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
};