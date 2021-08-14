import { useSelector } from "react-redux";

import { SolitaireCard } from "types/game";
import { SUIT, SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "types/suit";

import { EmptyFinalCard } from "./EmptyFinalCard";
import { FinalFaceCard } from "./FinalFaceCard";

import { currentGameSelector } from "store/game/gameSlice";

export const Final = (): JSX.Element => {
    
    const solitaire = useSelector(currentGameSelector);
    const final = solitaire.final;

    return ( 
        <div className="w-2/3 overflow-hidden flex flex-row justify-end">
            <div className="px-1">
                {generateFinalContainer(final.heart, SUIT_TYPE_HEART)}
            </div>
            <div className="px-1">
                {generateFinalContainer(final.diamond, SUIT_TYPE_DIAMOND)}
            </div>
            <div className="px-1">
                {generateFinalContainer(final.club, SUIT_TYPE_CLUB)}
            </div>
            <div className="px-1">
                {generateFinalContainer(final.spade, SUIT_TYPE_SPADE)}
            </div>
        </div>
    );
}

const generateFinalContainer = (cards: SolitaireCard[], type: SUIT): JSX.Element => {

    if (cards.length === 0) {
        return <EmptyFinalCard type={type}/>;
    }

    return <FinalFaceCard type={type} cards={cards}/>;
}