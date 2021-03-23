import { GameButton } from "./Button"

export const GameBar = (): JSX.Element => {
    return (
        <nav className="w-full bg-white shadow-lg border-b border-green-500 h-16">
            <div className="w-full flex flex-row justify-end p-2">
                <GameButton buttonText="New Game"/>
            </div>
        </nav>
    );
};