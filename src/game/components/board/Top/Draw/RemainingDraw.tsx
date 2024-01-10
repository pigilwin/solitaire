import { useDispatch } from "react-redux";
import { drawCardFromDeckAsync } from "store/game/thunk";
import { SolitaireCard } from "@typings/game";
import { Back } from "../../card/Back";
import { RefreshCard } from "./RefreshCard";
import { AppDispatch } from "@store/index";

interface RemainingDrawProps {
    remaining: SolitaireCard[];
}
export const RemainingDraw = ({remaining}: RemainingDrawProps): JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const drawClickHandler = (): void => {
        dispatch(drawCardFromDeckAsync());
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