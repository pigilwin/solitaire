import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd"
import { GameBar } from "./components/GameBar"
import { Board } from "./board";

export const Game = (): JSX.Element => {

    const onDragEndHandler = (result: DropResult, provided: ResponderProvided) => {

    };

    return (
        <div className="min-h-screen bg-green-300">
            <GameBar/>
            <DragDropContext onDragEnd={onDragEndHandler}>
                <Board/>
            </DragDropContext>
        </div>
    );
};