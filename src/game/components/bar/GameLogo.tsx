import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allowedToSeeTestingRouteAction } from "../../../store/application/applicationSlice";
import { countToRevealTestingRoute } from "../../../store/application/constants";

export const GameLogo = (): JSX.Element => {

    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count === countToRevealTestingRoute) {
            dispatch(allowedToSeeTestingRouteAction(true));
            setCount(0);
        }
    }, [dispatch, count]);

    const onClickHandler = () => {
        setCount(count + 1);
    };

    return (
        <div className="flex flex-row">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-800 font-bold text-2xl hover:text-gray-700 cursor-pointer" onClick={onClickHandler}>Solitaire</h1>
            </div>      
        </div>
    );
};