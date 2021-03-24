import { GameButton } from "./Button";

export const GameBar = (): JSX.Element => {
    return (
        <nav className="w-full bg-white shadow-lg border-b border-green-500 h-16">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-800 font-bold text-2xl hover:text-gray-700 cursor-pointer">Solitaire</h1>
                </div>
                <div className="flex flex-row">
                    <div className="px-1">
                        <GameButton buttonText="New Game"/>
                    </div>
                    <div className="px-1">
                        <GameButton buttonText="Leaderboard"/>
                    </div>
                    <div className="px-1">
                        <GameButton buttonText="Settings"/>
                    </div>
                </div>
            </div>
        </nav>
    );
};