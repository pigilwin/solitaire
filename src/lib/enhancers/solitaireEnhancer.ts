import { enhanceCard } from "lib/enhancers";
import { columnFromLocation } from "lib/util";
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
}