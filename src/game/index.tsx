import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { Board } from "./board";
import { currentGameSelector } from "../store/game/gameSlice";
import { GameContainer } from "./components/GameContainer";
import { GameComplete } from "./components/GameComplete";
import { isGameComplete } from "../store/game/isGameComplete";

export const Game = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);

    if (solitaire.id.length === 0) {
        return <GameContainer/>;
    }

    /**
     * If the game is complete
     */
    if (isGameComplete(solitaire)) {
        return <GameComplete solitaire={solitaire}/>;
    }

    return (
        <GameContainer>
            <DndProvider backend={HTML5Backend}>
                <Board solitaire={solitaire}/>
            </DndProvider>
        </GameContainer>
    );
};