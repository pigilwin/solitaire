import { useSelector } from "react-redux";

import { doWeHaveAnyHistorySelector } from "store/history/historySlice";
import { currentMovesSelector, currentScoreSelector } from "store/tracker/trackerSlice";

import { GameLogo } from './bar/GameLogo';
import { MovesCount } from './bar/MovesCount';
import { UndoGameButton } from './bar/UndoButton';
import { GameButtons } from "./bar/GameButtons";
import { ScoreCount } from "./bar/ScoreCount";
import {useState} from "react";

interface GameBarProps {
    isGameComplete: boolean;
}
export const GameBar = ({isGameComplete}: GameBarProps): JSX.Element => {

    const [isMenuOpen, openMenu] = useState(false);
    
    const weHaveHistory = useSelector(doWeHaveAnyHistorySelector);

    let undoButton: JSX.Element | null = null;
    if (weHaveHistory && !isGameComplete) {
        undoButton = <UndoGameButton/>;
    }

    const movesCount = useSelector(currentMovesSelector);
    const scoreCount = useSelector(currentScoreSelector);

    const miniMenuClasses: string[] = 'w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center justify-between h-full py-1 pb-4 sm:py-0 sm:pb-0'.split(' ');

    const openMenuClickHandler = (): void => {
        openMenu(!isMenuOpen);
    };

    if (isMenuOpen) {
        miniMenuClasses.push('flex', 'open', 'transition', 'duration-500', 'ease-in-out');
    } else {
        miniMenuClasses.push('hidden');
    }

    return (
        <nav className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-white shadow sm:shadow-none">
            <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
                <GameLogo/>
                <MovesCount count={movesCount}/>
                <ScoreCount count={scoreCount}/>
                <button className="hamburger block sm:hidden focus:outline-none" type="button" onClick={openMenuClickHandler}>
                    <MenuIcon/>
                </button>
            </div>
            <div className={miniMenuClasses.join(' ')}>
                <GameButtons undoButton={undoButton}/>
            </div>
        </nav>
    );
};

const MenuIcon = (): JSX.Element => {
    return (
        <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="10"/>
            <rect y="30" width="100" height="10"/>
            <rect y="60" width="100" height="10"/>
        </svg>
    );
}