import { enhanceCard } from "lib/enhancers/enhancers";
import { columnFromLocation, makeCardIndentifier, makeCardLocationAware } from "lib/util";
import { LocationAwareSolitaireCard, Solitaire, SolitaireCard } from "types/game";

export class SolitaireEnhancer {
    public constructor(private solitaire: Solitaire) {}

    public doAnyCardsExistAsChildren(card: LocationAwareSolitaireCard): boolean {
        const column = columnFromLocation(this.solitaire, card.location.namespace, card.location.area);
        const index = column.findIndex((inner) => {
            return enhanceCard(card).isIdenticalToo(inner);
        });
        return column.slice(index).length > 1;
    }

    public isGameComplete(): boolean
    {
        const cardIndexFromLocation = (cards: SolitaireCard[]): string => {

            if (cards.length === 0) {
                return '';
            }
            return cards[cards.length - 1].cardNumber;
        }
    
        const lastCardInFinalLocation = [
            cardIndexFromLocation(this.solitaire.final.club),
            cardIndexFromLocation(this.solitaire.final.spade),
            cardIndexFromLocation(this.solitaire.final.diamond),
            cardIndexFromLocation(this.solitaire.final.heart)
        ];
        const lastCardInFinalLocationAsKing = lastCardInFinalLocation.filter(type => type === 'K');
        return lastCardInFinalLocation.length === lastCardInFinalLocationAsKing.length;
    }

    public areAllCardsOnTheBoard(): string[]
    {
        /**
         * If the remaining cards are still populated 
         * then the game can't be allowed to auto complete
         */
        if (this.solitaire.draw.remaining.length > 0) {
            return [];
        }

        const allCards = [
            this.makeCardsLocationAware(this.solitaire.draw.current, 'draw', 'current'),
            this.makeCardsLocationAware(this.solitaire.columns.one, 'columns', 'one'),
            this.makeCardsLocationAware(this.solitaire.columns.two, 'columns', 'two'),
            this.makeCardsLocationAware(this.solitaire.columns.three, 'columns', 'three'),
            this.makeCardsLocationAware(this.solitaire.columns.four, 'columns', 'four'),
            this.makeCardsLocationAware(this.solitaire.columns.five, 'columns', 'five'),
            this.makeCardsLocationAware(this.solitaire.columns.six, 'columns', 'six'),
            this.makeCardsLocationAware(this.solitaire.columns.seven, 'columns', 'seven')
        ].flat();

        const allCardsRevealed = allCards.filter(card => {
            return card.showing;
        });

        /**
         * If every card is not showing then it can't be completed
         */
        if (allCards.length !== allCardsRevealed.length) {
            return [];
        }

        const grouped = allCards.reduce(function(carry: {[id: string]:  string[]}, card) {
            (carry[card.index] = carry[card.index] || []).push(makeCardIndentifier(card));
            return carry;
        }, {});

        return Object.values(grouped).flat().reverse();
    }

    private makeCardsLocationAware(cards: SolitaireCard[], namespace: string, area: string): LocationAwareSolitaireCard[]
    {
        return cards.map(card => makeCardLocationAware(card, namespace, area));
    }
}