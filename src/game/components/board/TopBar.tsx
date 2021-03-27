import { Solitaire, SolitaireCard, SUIT, SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "../../../store/game/suitTypes";
import { EmptyCardNoDrop } from "./EmptyCardNoDrop";
import { EmptyFinalCard } from "./EmptyFinalCard";
import { FinalFaceCard } from "./FinalFaceCard";
import { RemainingDraw } from "./RemainingDraw";

interface TopBarProps {
    solitaire: Solitaire;
}
export const TopBar = ({solitaire}: TopBarProps): JSX.Element => {
    return (
        <div className="flex flex-wrap mt-5">
            <div className="w-1/2 overflow-hidden flex flex-row justify-center">
                <div className="px-2">
                    <RemainingDraw remaining={solitaire.draw.remaining}/>
                </div>
                <div className="px-2">
                    <EmptyCardNoDrop/>
                </div>
            </div>
            <div className="w-1/2 overflow-hidden flex flex-row justify-center">
                <div className="px-2">
                    {generateFinalContainer(solitaire.final.heart, SUIT_TYPE_HEART)}
                </div>
                <div className="px-2">
                    {generateFinalContainer(solitaire.final.diamond, SUIT_TYPE_DIAMOND)}
                </div>
                <div className="px-2">
                    {generateFinalContainer(solitaire.final.club, SUIT_TYPE_CLUB)}
                </div>
                <div className="px-2">
                    {generateFinalContainer(solitaire.final.spade, SUIT_TYPE_SPADE)}
                </div>
            </div>
        </div>
    );
};

const generateFinalContainer = (cards: SolitaireCard[], type: SUIT): JSX.Element => {

    if (cards.length === 0) {
        return <EmptyFinalCard type={type}/>;
    }

    return <FinalFaceCard type={type} cards={cards}/>

}