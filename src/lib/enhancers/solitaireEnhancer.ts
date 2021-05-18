import { enhanceCard } from "lib/enhancers";
import { columnFromLocation } from "lib/util";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";

export class SolitaireEnhancer {
    public constructor(private solitaire: Solitaire) {}

    public doAnyCardsExistAsChildren(card: LocationAwareSolitaireCard): boolean {
        const column = columnFromLocation(this.solitaire, card.location.namespace, card.location.area);
        const index = column.findIndex((inner) => {
            return enhanceCard(card).isIdenticalToo(inner);
        });
        return column.slice(index).length > 0;
    }
}