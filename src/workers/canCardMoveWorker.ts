import { expose } from "comlink";
import { enhanceCard, enhanceSolitaire } from "lib/enhancers/enhancers";
import { columnFromLocation, finalFromLocation, makeCardLocationAware } from "lib/util";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";
import { CanCardMoveFromWorker, PotentialClickCardMovesWorker } from "types/worker";

const fetchTopLocationAwareCardFromColumns = (
    build: PotentialClickCardMovesWorker,  
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
    build: PotentialClickCardMovesWorker,  
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
    const potentialMoves: PotentialClickCardMovesWorker = {};


    /**
     * Load the last card in the final locations into the list of checks
     */
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'diamond');
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'heart');
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'club');
    fetchTopLocationAwareCardFromFinal(potentialMoves, solitaire, 'spade');

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

    const enhancedCardToCheck = enhanceCard(card);

    for (const key in potentialMoves) {
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
                return inner;
            }

            /**
             * If the card we are checking is a full card
             * then don't allow the card to be placed upon
             */
            if (!enhancedInner.isAFullCard() && !enhancedInner.isOnFinal()){
                return inner;
            }

            continue;
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
                return inner;
            }

            continue;
        }

         /**
         * The current card we are looping over has only a 
         * location, then this is a empty space. Empty spaces
         * can be forgotten about as only kings can use these
         */
        if (!enhancedInner.isAFullCard()){
            continue;
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
            return inner;
        }

        /**
         * If the card indexes aren't compatible then don't allow
         * the index to be moved
        */
         if (innerAsLocationAware.index === card.index + 1 && !enhancedInner.isOnFinal()) {
            return innerAsLocationAware;
        }

        /**
         * If the cards are indentical then it 
         * can't be moved to this stack
        */
         if (enhancedInner.isIdenticalToo(card)) {
            continue;
        }

        /**
         * If the cards are of the same color then 
         * these can't be transferred
        */
        if (enhancedInner.hasIdenticalColour(card)) {
            continue;
        }

        continue;

    }

    return undefined;
};

const exports = {
    canCardMove
};
export type WorkerType = typeof exports;

expose(exports);