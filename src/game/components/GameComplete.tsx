import anime from "animejs";
import { useAnimeSelector } from "../../hooks/useAnime";
import { generateDeck } from "../../store/game/initialiseGame";
import { Solitaire } from "../../store/game/types/game";
import { Face } from "./card/Face";
import { GameContainer } from "./GameContainer";

interface GameCompleteProps {
    solitaire: Solitaire;
}
export const GameComplete = ({solitaire}: GameCompleteProps): JSX.Element => {
    
    useAnimeSelector('.each-card', {
        'opacity': 1,
        delay: anime.stagger(100)
    }, solitaire.id);


    const items: JSX.Element[] = generateDeck().map((card, index) => {
        return (
            <div key={index} className="each-card opacity-0">
                <Face index={card.cardNumber} type={card.suit}/>
            </div>
        );
    });
    
    return (
        <GameContainer>
            <h1 className="text-center text-6xl">Game Completed</h1>
            <div className="grid grid-cols-7">
                {items}
            </div>
        </GameContainer>
    );
}