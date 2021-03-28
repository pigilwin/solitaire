import { MoveCardPayload, Solitaire, SolitaireCard } from "./types/game";

export const drawCardFromRemainingAddToDraw = (game: Solitaire): Solitaire => {
    const newGame: Solitaire = {...game};
    const latestCard = (newGame.draw.remaining.pop() as SolitaireCard);
    newGame.draw.draw.push(latestCard);
    return newGame;
}

export const moveCardToColumn = (game: Solitaire, payload: MoveCardPayload): Solitaire => {
    const newGame: Solitaire = {...game};
    
    console.log();

    return newGame;
}