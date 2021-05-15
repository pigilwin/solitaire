import { TopBar } from "./components/board/Top/TopBar";
import { Columns } from "./components/board/Columns";
import { useSelector } from "react-redux";
import { potentialMoveLocationsSelector } from "store/game/gameSlice";
import { LocationAwareSolitaireCard } from "types/game";

export const Board = (): JSX.Element => {
    
    const potentialMoves = useSelector(potentialMoveLocationsSelector);
    
    /**
     * If we have moves then show them
     */
    if (potentialMoves.length > 0) {
        return <ChooseLocation moves={potentialMoves}/>;
    }
    
    return (
        <div id="board">
            <TopBar/>
            <Columns/>
        </div>
    );
};

interface ChooseLocationProps {
    moves: LocationAwareSolitaireCard[];
}
const ChooseLocation = ({moves}: ChooseLocationProps): JSX.Element => {
    console.log(moves);
    return (
        <div>
            
        </div>
    );
}