import { MoveCardPayload, Solitaire, SolitaireCard } from "./types/game";

export const drawCardFromRemainingAddToDraw = (game: Solitaire): Solitaire => {
    const newGame: Solitaire = {...game};
    const latestCard = (newGame.draw.remaining.pop() as SolitaireCard);
    newGame.draw.draw.push(latestCard);
    return newGame;
}

export const moveCard = (game: Solitaire, payload: MoveCardPayload): Solitaire => {
    const newGame: Solitaire = {...game};

    if (payload.drag.location.namespace === 'draw' || payload.drag.location.namespace === 'final') {
        console.log('not implemented just yet');
        return newGame;
    }

    console.log(payload);
    
    return newGame;
}