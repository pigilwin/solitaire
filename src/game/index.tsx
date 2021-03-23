import { GameBar } from "./components/GameBar"

export const Game = (): JSX.Element => {
    return (
        <div className="mx-auto min-h-screen container">
            <GameBar/>
        </div>
    );
};