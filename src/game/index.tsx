import { Board } from "./board";
import { useSelector } from "react-redux";
import { currentGameSelector } from "../store/game/gameSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Solitaire, SolitaireCard } from "../store/game/types/game";
import { GameContainer } from "./components/GameContainer";
import { GameComplete } from "./components/GameComplete";

export const Game = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);

    if (solitaire.id.length === 0) {
        return <GameContainer/>;
    }

    /**
     * If the game is complete
     */
    if (isGameComplete(solitaire)) {
        return <GameComplete/>;
    }

    return (
        <GameContainer>
            <DndProvider backend={HTML5Backend}>
                <Board solitaire={solitaire}/>
            </DndProvider>
        </GameContainer>
    );
};

const isGameComplete = (solitaire: Solitaire): boolean => {

    const cardIndexFromLocation = (cards: SolitaireCard[]): string => {

        if (cards.length === 0) {
            return '';
        }
        return cards[cards.length - 1].cardNumber;
    }

    const lastCardInFinalLocation = [
        cardIndexFromLocation(solitaire.final.club),
        cardIndexFromLocation(solitaire.final.spade),
        cardIndexFromLocation(solitaire.final.diamond),
        cardIndexFromLocation(solitaire.final.heart)
    ];

    const lastCardInFinalLocationAsKing = lastCardInFinalLocation.filter(type => type === 'K');

    return lastCardInFinalLocation.length === lastCardInFinalLocationAsKing.length;
};