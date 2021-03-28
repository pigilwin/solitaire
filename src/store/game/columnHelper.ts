import { SolitaireCard, ColumnAwareSolitaireCard } from "./types/game";

export const makeCardColumnAware = (card: SolitaireCard, column: string): ColumnAwareSolitaireCard => {
    return {
        column: column,
        ...card
    }
}