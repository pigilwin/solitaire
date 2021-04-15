import { Game } from "../game/types/game";

export interface HistoryState {
    games: Game[];
    scores: number[];
}