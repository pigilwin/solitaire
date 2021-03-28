import { SolitaireCard, LocationAwareSolitaireCard } from "./types/game";

export const makeCardColumnAware = (card: SolitaireCard, namespace: string, area: string): LocationAwareSolitaireCard => {
    return {
        location: {
            namespace,
            area
        },
        ...card
    }
}