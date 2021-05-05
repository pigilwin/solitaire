import { makeCardLocationAware } from "store/game/locationHelper";
import { SolitaireCard, SolitaireDraw } from "store/game/types/game";
import { DrawCard } from "./DrawCard";
import { RemainingDraw } from "./RemainingDraw";

interface DrawProps {
    draw: SolitaireDraw;
}
export const Draw = ({draw}: DrawProps): JSX.Element => {
    return (
        <div className="w-1/2 overflow-hidden flex flex-row justify-center">
            <div className="px-2">
                {getRemainingCard(draw.remaining, draw.current)}
            </div>
            <div className="px-2">
                {getDrawCard(draw.current)}
            </div>
        </div>
    );
};

const getRemainingCard = (remaining: SolitaireCard[], draw: SolitaireCard[]): JSX.Element => {

    if (draw.length === 0 && remaining.length === 0) {
        return (<div className="playing-card-container"></div>);
    }

    return <RemainingDraw remaining={remaining}/>;
}

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
