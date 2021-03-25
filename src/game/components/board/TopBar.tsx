import { Solitaire, SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "../../../store/game/suitTypes";
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
                    <EmptyCardSpace/>
                </div>
            </div>
            <div className="w-1/2 overflow-hidden flex flex-row justify-center">
                <div className="px-2">
                    <EmptyFinalCard type={SUIT_TYPE_HEART}/>
                </div>
                <div className="px-2">
                    <EmptyFinalCard type={SUIT_TYPE_DIAMOND}/>
                </div>
                <div className="px-2">
                    <EmptyFinalCard type={SUIT_TYPE_CLUB}/>
                </div>
                <div className="px-2">
                    <EmptyFinalCard type={SUIT_TYPE_SPADE}/>
                </div>
            </div>
        </div>
    );
};