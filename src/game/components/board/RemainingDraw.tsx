import { SolitaireCard } from "../../../store/game/suitTypes";
import { Back } from "../card/Back";
import { RefreshCard } from "./RefreshCard";

interface RemainingDrawProps {
    remaining: SolitaireCard[];
}
export const RemainingDraw = ({remaining}: RemainingDrawProps): JSX.Element => {

    if (remaining.length === 0) {
        return <RefreshCard/>;
    }

    return (
        <div className="shadow-2xl">
            <Back/>
        </div>
    );
};