import { ChangeEvent, useState } from "react";
import { a, config, useSpring } from "@react-spring/web";
import { Solitaire } from "../../store/game/types/game";
import { GameButton } from "./Button";
import { GameContainer } from "./GameContainer";
import { useDispatch } from "react-redux";
import { clearGameAction } from "../../store/game/gameSlice";
import { clearHistoryAction } from "../../store/history/historySlice";
import { clearTrackerAction } from "../../store/tracker/trackerSlice";
import { Input } from "./Input";
import { GameBar } from "./GameBar";
import { toast } from "react-toastify";

interface GameCompleteProps {
    solitaire: Solitaire;
}
export const GameComplete = ({solitaire}: GameCompleteProps): JSX.Element => {

    const [styles] = useSpring({
        config: {
            ...config.stiff
        },
        from: {
            opacity: 0,
            transform: 'scale(1.0)'
        },
        to: async (next, cancel) => {
            await next({
                opacity: 1,
                transform: `scale(1.1)`
            });
            await next({
                opacity: 1,
                transform: `scale(1.0)`
            });
        },
    }, [solitaire.id]);

    return (
        <GameContainer>
            <GameBar solitaire={solitaire}/>
            <a.div style={styles} className="flex justify-center items-center flex-col p-10">
                <h1 className="text-center text-6xl">Game Completed</h1>
                <h1 className="text-center text-6xl">Well Done</h1>
                <SaveContainer/>
            </a.div>
        </GameContainer>
    );
}

const SaveContainer = (): JSX.Element => {
    const dispatch = useDispatch();
    const [showSavePage, setShowSavePage] = useState(false);
    const [name, setName] = useState('');

    const saveClickHandler = () => {
        setShowSavePage(true);
    };
    
    const doneClickHandler = () => {
        dispatch(clearGameAction());
        dispatch(clearHistoryAction());
        dispatch(clearTrackerAction());
    };

    const onNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const saveNameClickHandler = () => {
        if (name.length === 0) {
            toast('A name must be supplied', {
                type: 'error'
            });
            return;
        }
        //dispatch();
    };

    /**
     * If we should show the save page
     * then change the DOM
     */
    if (showSavePage){
        return (
            <div className='mt-5 p-10 w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md'>
                <p>Please enter your name to save the score</p>
                <Input onChangeHandler={onNameChangeHandler} placeholder="Name"/>
                <GameButton onClick={saveNameClickHandler} buttonText="Save"/>
            </div>
        );
    }

    return (
        <div className='mt-5 p-10 w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md'>
            <p>Would you like to save?</p>
            <GameButton onClick={saveClickHandler} buttonText="Yes"/>
            <GameButton onClick={doneClickHandler} buttonText="No"/>
        </div>
    );
};