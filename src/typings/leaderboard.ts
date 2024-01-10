export interface LeaderboardState {
    games: CompletedGame[];
}

export interface CompletedGame {
    moves: number;
    score: number;
    name: string;
    date: string;
    id: string;
}