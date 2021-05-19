import { useSelector } from "react-redux";

import { SolitaireCard } from "types/game";

import { makeCardLocationAware } from "lib/util";

import { currentGameSelector } from "store/game/gameSlice";

import { DrawCard } from "./DrawCard";
import { RemainingDraw } from "./RemainingDraw";
import { DoubleClickCardAwareContext } from "../../AwareContext/DoubleClickCardAwareContext";


export const Draw = (): JSX.Element => {
    
    const solitaire = useSelector(currentGameSelector);
    const draw = solitaire.draw;
    
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

    return (
        <DoubleClickCardAwareContext card={cardWithLocation}>
            <DrawCard card={cardWithLocation}/>;
        </DoubleClickCardAwareContext>
    );
}
