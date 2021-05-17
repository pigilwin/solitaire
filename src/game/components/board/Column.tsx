import { CardGroup } from './CardGroup';
import { SolitaireCard } from "types/game";
import { makeCardLocationAware } from 'lib/util';
interface ColumnProps {
    cards: SolitaireCard[];
    column: string;
}
export const Column = ({cards, column}: ColumnProps): JSX.Element | null => {
        
    const depth = cards.length;
    let child = null;
    
    /**
     * Loop over the cards backwards and stack them showing 
     * the standard card deck effect, each generated card is 
     * then the child of the next card generated until the
     * final finished "stack" is returned
     */
    for (let i = depth - 1; i >= 0; i--) {
        child = (<CardGroup 
            card={makeCardLocationAware(cards[i], 'columns', column)} 
            index={i}
            maxDepth={depth}
            >{child}</CardGroup>
        );
    }

    return child;
};