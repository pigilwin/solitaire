import { Solitaire, SolitaireCard } from "./types/game";

export const drawCardFromRemainingAddToDraw = (game: Solitaire): Solitaire => {
    const newGame: Solitaire = {...game};
    const latestCard = (newGame.draw.remaining.pop() as SolitaireCard);
    newGame.draw.draw.push(latestCard);
    return newGame;
}