import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { a, config, useSpring } from "@react-spring/web";
import { toast } from "react-toastify";

import { GameButton } from "./Button";
import { FullPageContainer } from "../layout/FullPageContainer";
import { Input } from "./Input";
import { GameBar } from "./GameBar";

import { clearGameAction, currentGameSelector } from "store/game/gameSlice";
import { clearHistoryAction } from "store/history/historySlice";
import { clearTrackerAction } from "store/tracker/trackerSlice";
import { completeGameAsync } from "store/leaderboard/thunk";

export const GameComplete = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);
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
        <FullPageContainer>
            <GameBar isGameComplete={true}/>
            <a.div style={styles} className="flex justify-center items-center flex-col p-10">
                <h1 className="text-center text-6xl">Game Completed</h1>
                <h1 className="text-center text-6xl">Well Done</h1>
                <SaveContainer/>
            </a.div>
        </FullPageContainer>
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
        
        dispatch(completeGameAsync(name));
    };

    /**
     * If we should show the save page
     * then change the DOM
     */
    if (showSavePage){
        return (
            <div className='mt-5 p-10 md:w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md'>
                <p>Please enter your name to save the score</p>
                <Input testID="cy-player-name" onChangeHandler={onNameChangeHandler} placeholder="Name"/>
                <GameButton testID="cy-save-game" onClick={saveNameClickHandler} buttonText="Save"/>
            </div>
        );
    }
    return (
        <div className='mt-5 p-10 w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md'>
            <p>Would you like to save?</p>
            <GameButton testID="cy-confirm-save" onClick={saveClickHandler} buttonText="Yes"/>
            <GameButton testID="cy-do-not-save" onClick={doneClickHandler} buttonText="No"/>
        </div>
    );
};