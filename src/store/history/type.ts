import { Game } from "../game/types/game";

export interface HistoryState {
    games: Game[];
    score: number[];
}