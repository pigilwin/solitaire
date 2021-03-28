import { SolitaireCard, ColumnAwareSolitaireCard } from "./types/game";

export const appendColumnToCard = (card: SolitaireCard, column: string): ColumnAwareSolitaireCard => {
    return {
        column: column,
        ...card
    }
}