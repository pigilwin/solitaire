import { useSelector } from "react-redux";
import { doWeHaveAnyHistorySelector } from "../../store/history/historySlice";
import { currentMovesSelector, currentScoreSelector } from "../../store/tracker/trackerSlice";
import { GameLogo } from './bar/GameLogo';
import { MovesCount } from './bar/MovesCount';
import { UndoGameButton } from './bar/UndoButton';
import { GameButtons } from "./bar/GameButtons";
import { ScoreCount } from "./bar/ScoreCount";

export const GameBar = (): JSX.Element => {
    
    let undoButton: JSX.Element | null = null;
    const weHaveHistory = useSelector(doWeHaveAnyHistorySelector);
    if (weHaveHistory) {
        undoButton = <UndoGameButton/>;
    }

    let movesCounter: JSX.Element | null = null;
    const movesCount = useSelector(currentMovesSelector);
    if (movesCount > 0) {
        movesCounter = <MovesCount count={movesCount}/>;
    }

    let scoreCounter: JSX.Element | null = null;
    const scoreCount = useSelector(currentScoreSelector);
    if (scoreCount > 0) {
        scoreCounter = <ScoreCount count={scoreCount}/>
    }


    return (
        <nav className="w-full bg-white shadow-lg border-b border-green-500 h-16">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <GameLogo/>
                {undoButton}
                {movesCounter}
                {scoreCounter}
                <GameButtons/>
            </div>
        </nav>
    );
};