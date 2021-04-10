import { useDispatch } from "react-redux";
import { refreshRemaningFromDrawAsync } from "../../../../../store/game/thunk";
import { Refresh } from "../../../Icons";

export const RefreshCard = (): JSX.Element => {

    const dispatch = useDispatch();
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