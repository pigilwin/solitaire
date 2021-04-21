import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allowedToSeeTestingRouteAction } from "../../../store/application/applicationSlice";
import { countToRevealTestingRoute } from "../../../store/application/constants";

export const GameLogo = (): JSX.Element => {

    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    useEffect(() => {

        if (count === countToRevealTestingRoute - 1) {

        }

        if (count === countToRevealTestingRoute) {
            dispatch(allowedToSeeTestingRouteAction(true));
        }

    }, [dispatch, count]);

    const onClickHandler = () => {
        /**
         * If the count has been revealed then don't allow the clicks to happen again
         */
        if (count === countToRevealTestingRoute) {
            return;
        }
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