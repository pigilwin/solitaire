import { expose } from "comlink";
import { columnFromLocation, finalFromLocation, makeCardLocationAware } from "lib/util";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";
import { CanCardMoveFromWorker, PotentialClickCardMovesWorker } from "types/worker";
import { canCardMoveToCard } from "./cardMoves";

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

    for (const key in potentialMoves) {
        const inner = potentialMoves[key];

        if (canCardMoveToCard(solitaire, card, inner)) {
            return inner;
        }
    }

    return undefined;
};

const exports = {
    canCardMove
};
export type WorkerType = typeof exports;

expose(exports);