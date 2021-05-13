import { PropsWithChildren } from "react";
import { LocationAwareSolitaireCard } from "types/game";

interface DoubleClickCardAwareContextProps {
    card: LocationAwareSolitaireCard;
}
export const DoubleClickCardAwareContext = ({card, children}: PropsWithChildren<DoubleClickCardAwareContextProps>) => {
    
    const doubleClickEventListener = () => {
        
    };
    
    return (
        <div className="double-click-card" onClick={doubleClickEventListener}>
            {children}
        </div>
    );
};