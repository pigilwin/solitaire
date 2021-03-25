import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { GameBar } from "./components/GameBar";
import { Board } from "./board";
import { useSelector } from "react-redux";
import { currentGameSelector } from "../store/game/gameSlice";

export const Game = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);

    const onDragEndHandler = (result: DropResult, provided: ResponderProvided) => {

    };

    return (
        <div className="min-h-screen bg-green-300">
            <GameBar/>
            <DragDropContext onDragEnd={onDragEndHandler}>
                <Board solitaire={solitaire}/>
            </DragDropContext>
        </div>
    );
};