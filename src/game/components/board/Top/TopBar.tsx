import { Solitaire } from "../../../../store/game/suitTypes";
import { Draw } from "./Draw/Draw";
import { Final } from "./Final/Final";

interface TopBarProps {
    solitaire: Solitaire;
}
export const TopBar = ({solitaire}: TopBarProps): JSX.Element => {
    return (
        <div className="flex flex-wrap mt-5">
            <Draw draw={solitaire.draw}/>
            <Final final={solitaire.final}/>
        </div>
    );
};