import { SolitaireCard } from "../../../store/game/types/game";
import { Column } from "./Column";
import { EmptyCardSpace } from "./EmptyCardSpace";

interface ConditionalColumnProps {
    cards: SolitaireCard[];
    columnName: string;
}
export const ConditionalColumn = ({cards, columnName}: ConditionalColumnProps): JSX.Element => {

    let content: JSX.Element = <Column cards={cards} column={columnName}/>;

    if (cards.length === 0) {
        content = <EmptyCardSpace column={columnName}/>;
    }

    return (
        <div className="animated-column opacity-0">
            {content}
        </div>
    );
};