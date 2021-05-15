import { invokeIsCardClickable } from "invokers/invokeIsCardClickable";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { currentGameSelector } from "store/game/gameSlice";
import { LocationAwareSolitaireCard } from "types/game";

interface DoubleClickCardAwareContextProps {
    card: LocationAwareSolitaireCard;
}
export const DoubleClickCardAwareContext = ({card, children}: PropsWithChildren<DoubleClickCardAwareContextProps>) => {
    
    const solitare = useSelector(currentGameSelector);
    const doubleClickEventListener = async () => {
        const potentialMoves = await invokeIsCardClickable(solitare, card);
        console.log(potentialMoves);
    };
    
    return (
        <div className="double-click-card" onDoubleClick={doubleClickEventListener}>
            {children}
        </div>
    );
};