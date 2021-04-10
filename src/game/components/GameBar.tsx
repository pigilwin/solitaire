import { useDispatch, useSelector } from "react-redux";
import { replaceGameAction } from "../../store/game/gameSlice";
import { initialiseGameAsync } from "../../store/game/thunk";
import { doWeHaveAnyHistorySelector, latestHistoryItemSelector, removeLatestHistoryItemAction } from "../../store/history/historySlice";
import { GameButton, IconGameButton } from "./Button";
import { Undo } from "./Icons";

export const GameBar = (): JSX.Element => {
    
    let undoButton: JSX.Element | null = null;
    const weHaveHistory = useSelector(doWeHaveAnyHistorySelector);
    
    if (weHaveHistory) {
        undoButton = <UndoGameButton/>;
    }

    return (
        <nav className="w-full bg-white shadow-lg border-b border-green-500 h-16">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <GameLogo/>
                {undoButton}
                <GameButtons/>
            </div>
        </nav>
    );
};

const GameLogo = (): JSX.Element => {
    return (
        <div className="flex flex-row">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-800 font-bold text-2xl hover:text-gray-700 cursor-pointer">Solitaire</h1>
            </div>      
        </div>
    );
}

const UndoGameButton = (): JSX.Element => {
    const dispatch = useDispatch();
    const game = useSelector(latestHistoryItemSelector);
    const undoHistoryClickHandler = () => {
        dispatch(removeLatestHistoryItemAction());
        dispatch(replaceGameAction(game));
    };
    
    return (
        <div className="flex flex-row">    
            <IconGameButton
                buttonText="Undo"
                icon={<Undo/>}
                onClick={undoHistoryClickHandler}
            />
        </div>
    );
}

const GameButtons = (): JSX.Element => {

    const dispatch = useDispatch();

    const newGameClickHandler = () => {
        dispatch(initialiseGameAsync());
    };

    const leaderboardClickHandler = () => {};
    const settingsClickHandler = () => {};

    return (
        <div className="flex flex-row">
            <div className="px-1">
                <GameButton buttonText="New Game" onClick={newGameClickHandler}/>
            </div>
            <div className="px-1">
                <GameButton buttonText="Leaderboard" onClick={leaderboardClickHandler}/>
            </div>
            <div className="px-1">
                <GameButton buttonText="Settings" onClick={settingsClickHandler}/>
            </div>
        </div>
    );
}