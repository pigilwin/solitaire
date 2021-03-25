import { TopBar } from "./components/board/TopBar";
import { Columns } from "./components/board/Columns";

export const Board = (): JSX.Element => {
    return (
        <div id="board">
            <TopBar/>
            <Columns/>
        </div>
    );
};