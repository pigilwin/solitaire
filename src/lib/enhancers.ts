import { LocationAwarePotentiallyUndefinedSolitaireCard, Solitaire } from "types/game";
import { CardEnhancer } from "./enhancers/cardEnhancer";
import { SolitaireEnhancer } from "./enhancers/solitaireEnhancer";

export const enhanceCard = (card: LocationAwarePotentiallyUndefinedSolitaireCard) => {
    return new CardEnhancer(card);
};

export const solitaireEnhancer = (solitaire: Solitaire) => {
    return new SolitaireEnhancer(solitaire);
}