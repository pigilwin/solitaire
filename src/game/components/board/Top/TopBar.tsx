import { Solitaire } from "../../../../store/game/types/game";
import { Draw } from "./Draw/Draw";
import { Final } from "./Final/Final";

interface TopBarProps {
    solitaire: Solitaire;
}
export const TopBar = ({solitaire}: TopBarProps): JSX.Element => {
    return (
        <div className="flex flex-wrap">
            <Draw draw={solitaire.draw}/>
            <Final final={solitaire.final}/>
        </div>
    );
};