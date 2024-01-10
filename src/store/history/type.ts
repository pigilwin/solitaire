import { Game } from "typings/game";

export interface HistoryState {
    games: Game[];
    scores: number[];
}