import { LocationAwarePotentiallyUndefinedSolitaireCard, LocationAwareSolitaireCard } from "types/game";

export class CardEnhancer {
    public constructor(private card: LocationAwarePotentiallyUndefinedSolitaireCard) {}

    public isIdenticalToo (second: LocationAwareSolitaireCard): boolean
    {
        if (!this.isAFullCard()) {
            return false;
        }

        const first = this.card as LocationAwareSolitaireCard;
        return first.cardNumber === second.cardNumber && first.suit === second.suit && first.index === second.index;
    };

    public isAFullCard (): boolean
    {
        return this.card.hasOwnProperty('cardNumber');
    }
    
    public isAKing (): boolean
    {
        if (!this.isAFullCard()) {
            return false;
        }
        return (this.card as LocationAwareSolitaireCard).cardNumber === 'K';
    }
    
    public isAAce(): boolean
    {
        if (!this.isAFullCard()) {
            return false;
        }
        return (this.card as LocationAwareSolitaireCard).cardNumber === 'A';
    }

    public isOnFinal(): boolean
    {
        return this.card.location.namespace === 'final';
    }

    public isOnColumns(): boolean
    {
        return this.card.location.namespace === 'columns';
    }
}