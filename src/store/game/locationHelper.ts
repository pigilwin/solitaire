import { SolitaireCard, LocationAwareSolitaireCard } from "./types/game";

export const makeCardLocationAware = (card: SolitaireCard, namespace: string, area: string): LocationAwareSolitaireCard => {
    return {
        location: {
            namespace,
            area
        },
        ...card
    }
}

export const isOnColumns = (card: LocationAwareSolitaireCard) => {
    return card.location.namespace === 'columns';
};

export const isOnDraw = (card: LocationAwareSolitaireCard) => {
    return card.location.namespace === 'draw';
}

export const isOnFinal = (card: LocationAwareSolitaireCard) => {
    return card.location.namespace === 'final';
}
