import { useSelector } from "react-redux";
import { doWeHaveAnyHistorySelector } from "../../store/history/historySlice";
import { currentMovesSelector, currentScoreSelector } from "../../store/tracker/trackerSlice";
import { GameLogo } from './bar/GameLogo';
import { MovesCount } from './bar/MovesCount';
import { UndoGameButton } from './bar/UndoButton';
import { GameButtons } from "./bar/GameButtons";
import { ScoreCount } from "./bar/ScoreCount";
import { Timer } from "./bar/Timer";
interface GameBarProps {
    start: number;
    end: number;
}
export const GameBar = ({start, end}: GameBarProps): JSX.Element => {
    
    let undoButton: JSX.Element | null = null;
    const weHaveHistory = useSelector(doWeHaveAnyHistorySelector);
    if (weHaveHistory) {
        undoButton = <UndoGameButton/>;
    }

    const movesCount = useSelector(currentMovesSelector);
    const scoreCount = useSelector(currentScoreSelector);
    const timer = 0;


    return (
        <nav className="w-full bg-white shadow-lg border-b border-green-500 h-16">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <GameLogo/>
                {undoButton}
                <MovesCount count={movesCount}/>
                <Timer timer={timer}/>
                <ScoreCount count={scoreCount}/>
                <GameButtons/>
            </div>
        </nav>
    );
};