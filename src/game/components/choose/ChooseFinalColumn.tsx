import { useDispatch } from "react-redux";
import { clearPossibleMovesAction } from "store/game/gameMoveSlice";
import { moveCardToFinalColumnAsync } from "store/game/thunk";
import { LocationAwarePotentiallyUndefinedSolitaireCard, LocationAwareSolitaireCard } from "types/game";
import { EmptyCard } from "../board/EmptyCard";

interface ChooseFinalColumnProps {
    innerCard: LocationAwarePotentiallyUndefinedSolitaireCard;
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
        <div className="cursor-pointer" onClick={chooseColumnClickHandler}>
            <EmptyCard/>
        </div>
    );
}