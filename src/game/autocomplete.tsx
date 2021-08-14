import { useAreAllTheCardsOnTheBoard } from "lib/hooks/useAreAllTheCardsOnTheBoard";
import { useEffect } from "react";
import { PropsWithChildren } from "react";
import { Solitaire } from "types/game";

interface AutoCompleteProps {
    solitaire: Solitaire;
}
export const AutoComplete = ({children, solitaire}: PropsWithChildren<AutoCompleteProps>): JSX.Element => {
    
    const areAllCardsOnTheBoard = useAreAllTheCardsOnTheBoard(solitaire);
    useEffect(() => {
        
        const id = areAllCardsOnTheBoard.pop();

        if (id === undefined) {
            return;
        }

        document.querySelector<HTMLDivElement>("#click-" + id)?.click();

    }, [areAllCardsOnTheBoard]);
    
    return (
        <div>
            {children}
        </div>
    );
};