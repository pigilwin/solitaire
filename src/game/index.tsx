import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useSelector } from "react-redux";
import { useState } from "react";

import { Board } from "./board";

import { currentGameSelector } from "store/game/gameSlice";

import { FullPageContainer } from "./layout/FullPageContainer";
import { GameComplete } from "./components/GameComplete";
import { GameBar } from "./components/GameBar";
import { useIsTheGameComplete } from "lib/hooks/useIsTheGameComplete";
import { useAreAllTheCardsOnTheBoard } from "lib/hooks/useAreAllTheCardsOnTheBoard";

type BackendFactory = typeof HTML5Backend;

export const Game = (): JSX.Element => {

    const [hasExceptedToCompleteGame, setHasExceptedToCompleteGame] = useState(false);
    const solitaire = useSelector(currentGameSelector);
    const [isGameComplete] = useIsTheGameComplete(solitaire);
    const [areAllCardsOnTheBoard] = useAreAllTheCardsOnTheBoard(solitaire, hasExceptedToCompleteGame);
    console.log(areAllCardsOnTheBoard);

    /**
     * Show the empty game screen if no game exists
     */
    if (solitaire.id.length === 0) {
        return (
            <FullPageContainer>
                <GameBar isGameComplete={true}/>
            </FullPageContainer>
        );
    }

    /**
     * If the game is complete
     */
    if (isGameComplete) {
        return <GameComplete/>;
    }

    const backend: BackendFactory = "ontouchstart" in window ? TouchBackend : HTML5Backend;

    return (
        <FullPageContainer>
            <GameBar isGameComplete={isGameComplete}/>
            <DndProvider backend={backend}>
                <Board/>
            </DndProvider>
        </FullPageContainer>
    );
};