import { TopBar } from "./components/board/Top/TopBar";
import { Columns } from "./components/board/Columns";

export const Board = (): JSX.Element => {
    return (
        <div id="board" className="w-auto mt-2">
            <TopBar/>
            <Columns/>
        </div>
    );
};