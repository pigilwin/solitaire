import { SolitaireCard } from "types/game";
import { Column } from "./Column";
import { DroppableEmptyCardSpace } from "./DroppableEmptyCardSpace";

interface ConditionalColumnProps {
    cards: SolitaireCard[];
    columnName: string;
}
export const ConditionalColumn = ({cards, columnName}: ConditionalColumnProps): JSX.Element => {

    let content: JSX.Element = <Column cards={cards} column={columnName}/>;

    if (cards.length === 0) {
        content = <DroppableEmptyCardSpace column={columnName}/>;
    }

    return content;
};