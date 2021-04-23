import { CardGroup } from './CardGroup';
import { SolitaireCard } from "../../../store/game/types/game";
import { makeCardLocationAware } from "../../../store/game/locationHelper";
interface ColumnProps {
    cards: SolitaireCard[];
    column: string;
}
export const Column = ({cards, column}: ColumnProps): JSX.Element | null => {
        
    const depth = cards.length;
    let child = null;
    
    /**
     * Generate each card appending the last generated card as a child
     * only apply the margin if its any card apart from the last
     */
    for (let i = depth - 1; i >= 0; i--) {

        const columnAwareCard = makeCardLocationAware(cards[i], 'columns', column);

        child = (<CardGroup 
            card={columnAwareCard} 
            index={i}
            maxDepth={depth}
            >{child}</CardGroup>
        );
    }

    return child;
};