import { useDispatch } from "react-redux";
import { clearPossibleMovesAction } from "store/game/gameMoveSlice";
import { moveCardToEmptyColumnAsync } from "store/game/thunk";
import { LocationAwarePotentiallyUndefinedSolitaireCard, LocationAwareSolitaireCard } from "types/game";
import { EmptyCard } from "../board/EmptyCard";

interface ChooseEmptyColumnProps {
    index: number;
    innerCard: LocationAwarePotentiallyUndefinedSolitaireCard;
    cardWantingToBeMoved: LocationAwareSolitaireCard;
}
export const ChooseEmptyColumn = ({index, innerCard, cardWantingToBeMoved}: ChooseEmptyColumnProps): JSX.Element => {
    const dispatch = useDispatch();
    const chooseColumnClickHandler = (): void => {
        dispatch(moveCardToEmptyColumnAsync({
            drag: cardWantingToBeMoved,
            column: innerCard.location.area
        }));
        dispatch(clearPossibleMovesAction());
    };
    
    return (
        <div className="cursor-pointer" key={index} onClick={chooseColumnClickHandler}>
            <EmptyCard/>
        </div>
    );
}