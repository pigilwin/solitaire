import { LocationAwarePotentiallyUndefinedSolitaireCard, Solitaire } from "types/game";
import { CardEnhancer } from "./enhancers/cardEnhancer";
import { SolitaireEnhancer } from "./enhancers/solitaireEnhancer";

export const enhanceCard = (card: LocationAwarePotentiallyUndefinedSolitaireCard): CardEnhancer => {
    return new CardEnhancer(card);
};

export const enhanceSolitaire = (solitaire: Solitaire): SolitaireEnhancer => {
    return new SolitaireEnhancer(solitaire);
}