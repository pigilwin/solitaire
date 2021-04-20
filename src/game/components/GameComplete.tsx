import { a, config, useSpring } from "@react-spring/web";
import { Solitaire } from "../../store/game/types/game";
import { GameButton } from "./Button";
import { GameContainer } from "./GameContainer";

interface GameCompleteProps {
    solitaire: Solitaire;
}
export const GameComplete = ({solitaire}: GameCompleteProps): JSX.Element => {

    const [styles] = useSpring(() => {
        return {
            config: {
                ...config.default
            },
            from: {
                opacity: 0,
                transform: 'scale(0) rotate(0deg)'
            },
            to: {
                opacity: 1,
                transform: `scale(1.0) rotate(360deg)`
            }
        };
    }, [solitaire.id]);

    const saveClickHandler = () => {};
    const doneClickHandler = () => {};
    
    return (
        <GameContainer>
            <div className="flex justify-center items-center flex-col p-10">
                <a.h1 style={styles} className="text-center text-6xl">Game Completed</a.h1>
                <a.div style={styles} className="mt-5 p-10 w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md">
                    <GameButton onClick={saveClickHandler} buttonText="Save"/>
                    <GameButton onClick={doneClickHandler} buttonText="Done"/>
                </a.div>
            </div>
        </GameContainer>
    );
}