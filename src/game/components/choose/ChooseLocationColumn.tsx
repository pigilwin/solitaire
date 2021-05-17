import { useDispatch, useSelector } from 'react-redux';

import { columnFromLocation, makeCardLocationAware } from 'lib/util';

import { LocationAwareSolitaireCard } from 'types/game';

import { currentGameSelector } from 'store/game/gameSlice';
import { moveCardToColumnAsync } from 'store/game/thunk';
import { clearPossibleMovesAction } from 'store/game/gameMoveSlice';

import { Column } from '../board/Column';
interface ChooseLocationColumnProps {
    innerCard: LocationAwareSolitaireCard;
    cardWantingToBeMoved: LocationAwareSolitaireCard;
    index: number;
}
export const ChooseLocationColumn = ({innerCard, cardWantingToBeMoved, index}: ChooseLocationColumnProps): JSX.Element => {
    const dispatch = useDispatch();
    const solitaire = useSelector(currentGameSelector);
    const cards = columnFromLocation(solitaire, innerCard.location.namespace, innerCard.location.area);

    const chooseColumnClickHandler = (): void => {
        const card = makeCardLocationAware(
            cards[cards.length - 1], 
            innerCard.location.namespace, 
            innerCard.location.area
        );
        dispatch(moveCardToColumnAsync({
            drag: cardWantingToBeMoved,
            drop: card
        }));
        dispatch(clearPossibleMovesAction());
    };
    
    return (
        <div className="cursor-pointer" key={index} onClick={chooseColumnClickHandler}>
            <Column cards={cards} column={innerCard.location.area}/>
        </div>  
    );
}