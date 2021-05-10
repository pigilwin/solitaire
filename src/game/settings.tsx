import { useHistory } from "react-router-dom";
import {GameButton } from './components/Button';
import { Accordion } from "./layout/Accordion";

export const Settings = (): JSX.Element => {
    const history = useHistory();
    const onClickHandler = () => {
        history.replace('/');
    };

    return (
        <div className="flex min-h-screen bg-green-300">
            <div className="m-auto w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl mt-4">Settings</h1>
                <div className="my-2 text-center">
                    <GameButton buttonText="Go Home" onClick={onClickHandler}/>
                </div>
                <div className="mx-1">
                    <Accordion title="Choose a new card back">

                    </Accordion>
                </div>
            </div>
        </div>
    );
}