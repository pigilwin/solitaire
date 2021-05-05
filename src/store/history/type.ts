import { Game } from "types/game";

export interface HistoryState {
    games: Game[];
    scores: number[];
}