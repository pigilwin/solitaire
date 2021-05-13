import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

import { Board } from "./board";

import { currentGameSelector } from "store/game/gameSlice";

import { FullPageContainer } from "./layout/FullPageContainer";
import { GameComplete } from "./components/GameComplete";
import { GameBar } from "./components/GameBar";
import { isTheGameComplete } from "invokeWorkers";
import { useEffectAsync } from "hooks/useEffectAsync";

export const Game = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);
    const [gameComplete, setGameComplete] = useState(false);

    useEffectAsync(async () => {
        const state = await isTheGameComplete(solitaire);
        setGameComplete(state);
    }, [solitaire]);

    if (solitaire.id.length === 0) {
        return (
            <FullPageContainer>
                <GameBar/>
            </FullPageContainer>
        );
    }

    /**
     * If the game is complete
     */
    if (gameComplete) {
        return <GameComplete/>;
    }

    return (
        <FullPageContainer>
            <GameBar/>
            <DndProvider backend={HTML5Backend}>
                <Board/>
            </DndProvider>
        </FullPageContainer>
    );
};