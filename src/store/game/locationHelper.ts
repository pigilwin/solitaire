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

export const isOnColumn = () => {

};