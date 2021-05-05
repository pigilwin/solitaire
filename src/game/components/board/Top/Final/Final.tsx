import { SUIT, SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "store/game/types/suit";
import { EmptyFinalCard } from "./EmptyFinalCard";
import { FinalFaceCard } from "./FinalFaceCard";
import { SolitaireCard, SolitaireFinal } from "store/game/types/game";

interface FinalProps {
    final: SolitaireFinal;
}
export const Final = ({final}: FinalProps): JSX.Element => {
    return ( 
        <div className="w-1/2 overflow-hidden flex flex-row justify-center">
            <div className="px-2">
                {generateFinalContainer(final.heart, SUIT_TYPE_HEART)}
            </div>
            <div className="px-2">
                {generateFinalContainer(final.diamond, SUIT_TYPE_DIAMOND)}
            </div>
            <div className="px-2">
                {generateFinalContainer(final.club, SUIT_TYPE_CLUB)}
            </div>
            <div className="px-2">
                {generateFinalContainer(final.spade, SUIT_TYPE_SPADE)}
            </div>
        </div>
    );
}

const generateFinalContainer = (cards: SolitaireCard[], type: SUIT): JSX.Element => {

    if (cards.length === 0) {
        return <EmptyFinalCard type={type}/>;
    }

    return <FinalFaceCard type={type} cards={cards}/>

}