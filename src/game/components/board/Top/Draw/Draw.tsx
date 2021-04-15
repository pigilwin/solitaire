import { makeCardLocationAware } from "../../../../../store/game/locationHelper";
import { SolitaireCard, SolitaireDraw } from "../../../../../store/game/types/game";
import { DrawCard } from "./DrawCard";
import { RemainingDraw } from "./RemainingDraw";

interface DrawProps {
    draw: SolitaireDraw;
}
export const Draw = ({draw}: DrawProps): JSX.Element => {
    return (
        <div className="w-1/2 overflow-hidden flex flex-row justify-center">
            <div className="px-2">
                <RemainingDraw remaining={draw.remaining}/>
            </div>
            <div className="px-2">
                {getDrawCard(draw.current)}
            </div>
        </div>
    );
};

const getDrawCard = (cards: SolitaireCard[]): JSX.Element => {

    /**
     * If no draws have been found then show a empty card space
     */
    if (cards.length === 0) {
        return (<div className="playing-card-container"></div>);
    }
    const card = cards[cards.length - 1];
    const cardWithLocation = makeCardLocationAware(card, 'draw', 'current');

    return <DrawCard card={cardWithLocation}/>;
}
