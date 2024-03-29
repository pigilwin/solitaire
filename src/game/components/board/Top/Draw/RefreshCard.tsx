import { AppDispatch } from "@store/index";
import { useDispatch } from "react-redux";
import { refreshRemaningFromDrawAsync } from "store/game/thunk";

export const RefreshCard = (): JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();
    const onClickRefeshHandler = () => {
        dispatch(refreshRemaningFromDrawAsync());
    };

    return (
        <div className="playing-card flex flex-col justify-center p-1 cursor-pointer" onClick={onClickRefeshHandler}>
            <div className="flex justify-center">
                <Refresh/>
            </div>
        </div>
    );
};

const Refresh = (): JSX.Element => {
    return (
        <svg height="50" viewBox="0 0 21 21" width="50" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 2)">
                <path d="m5.53718227 1.54888175c-2.41169541 1.37786775-4.03718227 3.9746666-4.03718227 6.95111825 0 4.418278 3.581722 8 8 8m4-1c2.2866288-1.4081018 4-4.1175492 4-7 0-4.418278-3.581722-8-8-8"/>
                <path d="m5.5 1.5v5h-5.5" transform="matrix(1 0 0 -1 0 8)"/>
                <path d="m19 10.5v5h-5.5" transform="matrix(-1 0 0 1 32.5 0)"/>
            </g>
        </svg>
    );
}