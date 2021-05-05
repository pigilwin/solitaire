import { useSelector } from "react-redux";

import { doWeHaveAnyHistorySelector } from "store/history/historySlice";
import { currentMovesSelector, currentScoreSelector } from "store/tracker/trackerSlice";
import { isGameComplete } from "store/game/isGameComplete";
import { Solitaire } from "store/game/types/game";

import { GameLogo } from './bar/GameLogo';
import { MovesCount } from './bar/MovesCount';
import { UndoGameButton } from './bar/UndoButton';
import { GameButtons } from "./bar/GameButtons";
import { ScoreCount } from "./bar/ScoreCount";

interface GameBarProps {
    solitaire: Solitaire;
}
export const GameBar = ({solitaire}: GameBarProps): JSX.Element => {
    
    const weHaveHistory = useSelector(doWeHaveAnyHistorySelector);

    let undoButton: JSX.Element | null = null;
    if (weHaveHistory && !isGameComplete(solitaire)) {
        undoButton = <UndoGameButton/>;
    }

    const movesCount = useSelector(currentMovesSelector);
    const scoreCount = useSelector(currentScoreSelector);

    return (
        <nav className="w-full bg-white shadow-lg border-b border-green-500 h-16 mb-2">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <GameLogo/>
                {undoButton}
                <MovesCount count={movesCount}/>
                <ScoreCount count={scoreCount}/>
                <GameButtons/>
            </div>
        </nav>
    );
};