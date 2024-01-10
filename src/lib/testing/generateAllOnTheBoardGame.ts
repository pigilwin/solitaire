import { generateDeck } from "store/game/initialiseGame";
import { Game, SolitaireCard } from "typings/game";
import { SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE, SUIT_TYPE_CLUB } from "typings/suit";
import { v4 } from "uuid";

export const generateAllOneTheBoardGame = (): Game => {
    
    const game = generateDeck().map((card) => {
        card.showing = true;
        return card;
    });

    const diamonds = game.filter(card => card.suit === SUIT_TYPE_DIAMOND).reverse();
    const hearts = game.filter(card => card.suit === SUIT_TYPE_HEART).reverse();
    const spades = game.filter(card => card.suit === SUIT_TYPE_SPADE).reverse();
    const clubs = game.filter(card => card.suit === SUIT_TYPE_CLUB).reverse();

    const {first: one, second: two} = generateCardLists(diamonds, spades);
    const {first: three, second: four} = generateCardLists(hearts, clubs);

    return {
        game: {
            id: v4(),
            columns: {
                one: one,
                two: two,
                three: three,
                four: four,
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

const generateCardLists = (suitOne: SolitaireCard[], suitTwo: SolitaireCard[]): {
    first: SolitaireCard[],
    second: SolitaireCard[]
} => {

    const first: SolitaireCard[] = [];
    const second: SolitaireCard[] = [];

    suitOne.forEach((card, index) => {
        if (index % 2 === 0) {
            first.push(card);
            second.push(suitTwo[index]);
        } else {
            second.push(card);
            first.push(suitTwo[index]);
        }
    });

    return {
        first,
        second
    };
};