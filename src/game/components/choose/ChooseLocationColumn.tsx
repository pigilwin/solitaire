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
}
export const ChooseLocationColumn = ({innerCard, cardWantingToBeMoved}: ChooseLocationColumnProps): JSX.Element => {
    const dispatch = useDispatch();
    const solitaire = useSelector(currentGameSelector);
    const cards = columnFromLocation(solitaire, innerCard.location.namespace, innerCard.location.area);
    const card = makeCardLocationAware(cards[cards.length - 1], innerCard.location.namespace, innerCard.location.area);

    const chooseColumnClickHandler = (): void => {
        dispatch(moveCardToColumnAsync({
            drag: cardWantingToBeMoved,
            drop: card
        }));
        dispatch(clearPossibleMovesAction());
    };
    
    return (
        <div className="cursor-pointer" data-cy-test-id={"choose-column-" + card.cardNumber + "-" + card.suit} onClick={chooseColumnClickHandler}>
            <Column cards={cards} column={innerCard.location.area}/>
        </div>  
    );
}