import { TopBar } from "./components/board/Top/TopBar";
import { Columns } from "./components/board/Columns";
import { Solitaire } from "types/game";

interface BoardProps {
    solitaire: Solitaire;
}
export const Board = ({solitaire}: BoardProps): JSX.Element => {
    return (
        <div id="board">
            <TopBar solitaire={solitaire}/>
            <Columns solitaire={solitaire}/>
        </div>
    );
};