import { LocationAwarePotentiallyUndefinedSolitaireCard, Solitaire } from "types/game";
import { CardEnhancer } from "./cardEnhancer";
import { SolitaireEnhancer } from "./solitaireEnhancer";

export const enhanceCard = (card: LocationAwarePotentiallyUndefinedSolitaireCard): CardEnhancer => {
    return new CardEnhancer(card);
};

export const enhanceSolitaire = (solitaire: Solitaire): SolitaireEnhancer => {
    return new SolitaireEnhancer(solitaire);
}