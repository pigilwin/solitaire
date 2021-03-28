import { SolitaireDraw } from "../../../../../store/game/suitTypes";
import { DrawCard } from "./DrawCard";
import { RemainingDraw } from "./RemainingDraw";

interface DrawProps {
    draw: SolitaireDraw;
}
export const Draw = ({draw}: DrawProps): JSX.Element => {
    return (
        <div className="w-1/2 overflow-hidden flex flex-row justify-center">
            <div className="px-2">
                <RemainingDraw remaining={draw.remaining}/>
            </div>
            <div className="px-2">
                <DrawCard draw={draw.draw}/>
            </div>
        </div>
    );
};