/* istanbul ignore file */
import { expose } from "comlink";
import { enhanceCard, enhanceSolitaire } from "lib/enhancers/enhancers";
import { columnFromLocation, finalFromLocation, makeCardLocationAware } from "lib/util";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";
import { CanCardMoveFromWorker } from "types/worker";

const fetchTopLocationAwareCardFromColumns = (
    build: CanCardMoveFromWorker,  
    solitaire: Solitaire,
    area: string
): void => {
    const cards = columnFromLocation(solitaire, 'columns', area);
    const card = cards[cards.length - 1];
    
    if (card === undefined) {
        build[area] = {
            location: {
                namespace: 'columns',
                area
            }
        };
    }

    build[area] = makeCardLocationAware(card, 'columns', area);
};

const fetchTopLocationAwareCardFromFinal = (
    build: CanCardMoveFromWorker,  
    solitaire: Solitaire,
    area: string
): void => {
    const cards = finalFromLocation(solitaire, area);
    const card = cards[cards.length - 1];
    
    if (card === undefined) {
        build[area] = {
            location: {
                namespace: 'final',
                area
            }
        };
    }

    build[area] = makeCardLocationAware(card, 'final', area);
};

const canCardMove = (solitaire: Solitaire, card: LocationAwareSolitaireCard): CanCardMoveFromWorker => {

    const enhancedSolitaire = enhanceSolitaire(solitaire);
    const potentialMoves: CanCardMoveFromWorker = {};

    /**
     * Load the last card in every column into the list of checks
     */
    fetchTopLocationAwareCardFromColumns(potentialMoves, solitaire, 'one');
    fetchTopLocationAwareCardFromColumns(potentialMoves, solitaire, 'two');
    fetchTopLocationAwareCardFromColumns(potentialMoves, solitaire, 'three');
    fetchTopLocationAwareCardFromColumns(potentialMoves, solitaire, 'four');
    fetchTopLocationAwareCardFromColumns(potentialMoves, solitaire, 'five');
    fetchTopLocationAwareCardFromColumns(potentialMoves, solitaire, 'six');
    fetchTopLocationAwareCardFromColumns(potentialMoves, solitaire, 'seven');

    /**
     * Load the last card in the final locations into the list of checks
     */
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'diamond');
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'heart');
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'club');
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'spade');

    const enhancedCardToCheck = enhanceCard(card);

    const locationsOfCardsWanted = Object.keys(potentialMoves).filter((key) => {
        const inner = potentialMoves[key];
        const enhancedInner = enhanceCard(inner);

        /**
         * If the card we have clicked on is of type king
         */
         if (enhancedCardToCheck.isAKing()) {

            /**
             * If the card we are checking currently on the final stack, is a queen and matches
             * the suit then allow it to be processed
             */
            if (enhancedInner.isAQueen() && enhancedInner.isOnFinal() && enhancedInner.hasIdenticalSuit(card)) {
                return true;
            }

            /**
             * If the card we are checking is a full card
             * then don't allow the card to be placed upon
             */
            if (!enhancedInner.isAFullCard()){
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
            if (enhancedInner.isOnFinal() && !enhancedInner.isAFullCard() && inner.location.area === card.suit.toLowerCase()) {
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

        /**
         * If the suits match and the card, the card index
         * of the card being checked plus one matches the 
         * card clicked on, both card suits match and the
         * card being clicke on has no children then the
         * card can be moved to the final
         */
        if (
            enhancedInner.isOnFinal() && 
            innerAsLocationAware.index + 1 === card.index && 
            enhancedInner.hasIdenticalSuit(card) && 
            !enhancedSolitaire.doAnyCardsExistAsChildren(card)
        ) {
            return true;
        }

        /**
         * If the cards are indentical then it 
         * can't be moved to this stack
        */
        if (enhancedInner.isIdenticalToo(card)) {
            return false;
        }

        /**
         * If the cards are of the same color then 
         * these can't be transferred
        */
        if (enhancedInner.hasIdenticalColour(card)) {
            return false;
        }

        /**
         * If the card indexes aren't compatible then don't allow
         * the index to be moved
        */
        if (innerAsLocationAware.index === card.index + 1) {
            return true;
        }

        return false;
    });
    
    const moves: CanCardMoveFromWorker = {};
    locationsOfCardsWanted.forEach((k) => {
        moves[k] = potentialMoves[k];
    });
    return moves;
};

const exports = {
    canCardMove
};
export type WorkerType = typeof exports;

expose(exports);