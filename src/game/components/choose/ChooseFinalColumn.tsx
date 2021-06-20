import { useDispatch } from "react-redux";
import { clearPossibleMovesAction } from "store/game/gameMoveSlice";
import { moveCardToFinalColumnAsync } from "store/game/thunk";
import { LocationAwareSolitaireCard } from "types/game";
import { Card } from '../board/Card';

interface ChooseFinalColumnProps {
    innerCard: LocationAwareSolitaireCard;
    cardWantingToBeMoved: LocationAwareSolitaireCard;
}
export const ChooseFinalColumn = ({innerCard, cardWantingToBeMoved}: ChooseFinalColumnProps): JSX.Element => {
    const dispatch = useDispatch();
    const chooseColumnClickHandler = (): void => {
        dispatch(moveCardToFinalColumnAsync({
            drag: cardWantingToBeMoved,
            column: innerCard.location.area
        }));
        dispatch(clearPossibleMovesAction());
    };
    
    return (
        <div className="cursor-pointer" data-cy-test-id={"choose-column-" + innerCard.location.area} onClick={chooseColumnClickHandler}>
            <Card card={innerCard}/>
        </div>
    );
}