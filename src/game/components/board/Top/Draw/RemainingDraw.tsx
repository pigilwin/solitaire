import { useDispatch } from "react-redux";
import { drawCardFromDeck } from "../../../../../store/game/gameSlice";
import { SolitaireCard } from "../../../../../store/game/suitTypes";
import { Back } from "../../../card/Back";
import { RefreshCard } from "./RefreshCard";

interface RemainingDrawProps {
    remaining: SolitaireCard[];
}
export const RemainingDraw = ({remaining}: RemainingDrawProps): JSX.Element => {

    const dispatch = useDispatch();

    const drawClickHandler = (): void => {
        dispatch(drawCardFromDeck());
    };

    if (remaining.length === 0) {
        return <RefreshCard/>;
    }

    return (
        <div className="shadow-2xl cursor-pointer" onClick={drawClickHandler}>
            <Back/>
        </div>
    );
};