import { enhanceCard, enhanceSolitaire } from "lib/enhancers/enhancers";
import { LocationAwarePotentiallyUndefinedSolitaireCard, LocationAwareSolitaireCard, Solitaire } from "types/game";

export const canCardMoveToCard = (
    solitaire: Solitaire, 
    card: LocationAwarePotentiallyUndefinedSolitaireCard, 
    inner: LocationAwarePotentiallyUndefinedSolitaireCard
): boolean => {
    const enhancedSolitaire = enhanceSolitaire(solitaire);
    const enhancedCardToCheck = enhanceCard(card);
    const enhancedInner = enhanceCard(inner);


    /**
     * If the card we have clicked on is of type king
     */
     if (enhancedCardToCheck.isAKing()) {
        /**
         * If the card we are checking currently on the final stack, is a queen and matches
         * the suit then allow it to be processed
         */
        if (enhancedInner.isAQueen() && enhancedInner.isOnFinal() && enhancedInner.hasIdenticalSuit(card as LocationAwareSolitaireCard)) {
            return true;
        }

        /**
         * If the card we are checking is a full card
         * then don't allow the card to be placed upon
         */
        if (!enhancedInner.isAFullCard() && !enhancedInner.isOnFinal()){
            return true;
        }

        return false;
    }

    /**
     * If the card we have clicked on is of type ace
     */
    if (enhancedCardToCheck.isAAce()) {
        /**
         * If the card we are checking is on a final and not a full card then
         * allow the card to move it to the space
         */
        if (enhancedInner.isOnFinal() && !enhancedInner.isAFullCard() && inner.location.area === (card as LocationAwareSolitaireCard).suit.toLowerCase()) {
            return true;
        }

        return false;
    }

    /**
     * The current card we are looping over has only a 
     * location, then this is a empty space. Empty spaces
     * can be forgotten about as only kings can use these
     */
    if (!enhancedInner.isAFullCard()){
        return false;
    }
    
    const innerAsLocationAware = inner as LocationAwareSolitaireCard;
    const cardAsLocationAware = card as LocationAwareSolitaireCard;

    /**
     * If the suits match and the card, the card index
     * of the card being checked plus one matches the 
     * card clicked on, both card suits match and the
     * card being clicke on has no children then the
     * card can be moved to the final
     */
     if (
        enhancedInner.isOnFinal() && 
        innerAsLocationAware.index + 1 === cardAsLocationAware.index && 
        enhancedInner.hasIdenticalSuit(cardAsLocationAware) && 
        !enhancedSolitaire.doAnyCardsExistAsChildren(cardAsLocationAware)
    ) {
        return true;
    }

    /**
     * If the card indexes aren't compatible then don't allow
     * the index to be moved
    */
    if (innerAsLocationAware.index === cardAsLocationAware.index + 1 && !enhancedInner.isOnFinal() && !enhancedInner.hasIdenticalColour(cardAsLocationAware)) {
        return true;
    }

    return false;
};