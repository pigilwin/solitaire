import { LocationAwarePotentiallyUndefinedSolitaireCard } from "types/game";
import { CardEnhancer } from "./enhancers/cardEnhancer";

export const enhanceCard = (card: LocationAwarePotentiallyUndefinedSolitaireCard) => {
    return new CardEnhancer(card);
};