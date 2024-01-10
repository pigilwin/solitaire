import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useSelector } from "react-redux";

import { Board } from "./board";

import { currentGameSelector } from "@store/game/gameSlice";

import { FullPageContainer } from "./layout/FullPageContainer";
import { GameComplete } from "./components/GameComplete";
import { GameBar } from "./components/GameBar";
import { useIsTheGameComplete } from "@lib/hooks/useIsTheGameComplete";
import { shouldTheGameBeFinishedAutomaticallySelector } from "@store/application/applicationSlice";
import { AutoComplete } from "./autocomplete";

type BackendFactory = typeof HTML5Backend;

export const Game = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);
    const autoComplete = useSelector(shouldTheGameBeFinishedAutomaticallySelector);
    const isGameComplete = useIsTheGameComplete(solitaire);

    /**
     * Show the empty game screen if no game exists,
     * mark the game as complete to hide the buttons
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

    /**
     * If the client has asked for auto complete
     */
    if (autoComplete) {
        return (
            <AutoComplete solitaire={solitaire}>
                {generatePage(isGameComplete)}
            </AutoComplete>
        );
    }

    return generatePage(isGameComplete);
};

const generatePage = (isGameComplete: boolean): JSX.Element => {
    /**
     * Depending if we are on mobile or not apply DND backend
     */
     const backend: BackendFactory = "ontouchstart" in window ? TouchBackend : HTML5Backend;

     return (
         <FullPageContainer>
             <GameBar isGameComplete={isGameComplete}/>
             <DndProvider backend={backend}>
                 <Board/>
             </DndProvider>
         </FullPageContainer>
     );
}