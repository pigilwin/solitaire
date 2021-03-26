import { Solitaire, SolitaireCard, SUIT, SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "../../../store/game/suitTypes";
import { EmptyCardNoDrop } from "./EmptyCardNoDrop";
import { EmptyCardSpace } from "./EmptyCardSpace";
import { EmptyFinalCard } from "./EmptyFinalCard";

interface TopBarProps {
    solitaire: Solitaire;
}
export const TopBar = ({solitaire}: TopBarProps): JSX.Element => {
    return (
        <div className="flex flex-wrap mt-5">
            <div className="w-1/2 overflow-hidden flex flex-row justify-center">
                <div className="px-2">
                    <EmptyCardSpace/>
                </div>
                <div className="px-2">
                    <EmptyCardNoDrop/>
                </div>
            </div>
            <div className="w-1/2 overflow-hidden flex flex-row justify-center">
                <div className="px-2">
                    {generateFinalContainer(solitaire.heart, SUIT_TYPE_HEART)}
                </div>
                <div className="px-2">
                    {generateFinalContainer(solitaire.diamond, SUIT_TYPE_DIAMOND)}
                </div>
                <div className="px-2">
                    {generateFinalContainer(solitaire.club, SUIT_TYPE_CLUB)}
                </div>
                <div className="px-2">
                    {generateFinalContainer(solitaire.spade, SUIT_TYPE_SPADE)}
                </div>
            </div>
        </div>
    );
};

const generateFinalContainer = (cards: SolitaireCard[], type: SUIT): JSX.Element => {

    if (cards.length === 0) {
        return <EmptyFinalCard type={type}/>;
    }

    return <EmptyFinalCard type={type}/>

}