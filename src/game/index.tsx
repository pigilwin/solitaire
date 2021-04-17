import { Board } from "./board";
import { useSelector } from "react-redux";
import { currentGameSelector } from "../store/game/gameSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Game = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);

    if (solitaire.id.length === 0) {
        return (<div className="min-h-screen bg-green-300"></div>);
    }

    return (
        <div className="min-h-screen bg-green-300 pt-2">
            <DndProvider backend={HTML5Backend}>
                <Board solitaire={solitaire}/>
            </DndProvider>
        </div>
    );
};