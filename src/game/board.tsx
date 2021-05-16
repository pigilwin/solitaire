import { useSelector } from "react-redux";

import { TopBar } from "./components/board/Top/TopBar";
import { Columns } from "./components/board/Columns";
import { ChooseLocation } from './components/ChooseLocation';

import { potentialMoveLocationsSelector } from "store/game/gameMoveSlice";

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