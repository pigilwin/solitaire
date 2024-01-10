import { CompletedGame } from "typings/leaderboard";
import { openDatabase } from "../database";

export class LeaderboardDatabase {
    
    public static async create(game: CompletedGame): Promise<CompletedGame> {
        const database = await openDatabase();
        const transaction = database.transaction('completed-games', 'readwrite');
        const store = transaction.objectStore('completed-games');
        await store.put(game, game.id);
        await transaction.done;
        return game;
    }

    public static async read(): Promise<CompletedGame[]> {
        const database = await openDatabase();
        const transaction = database.transaction('completed-games');
        const store = transaction.objectStore('completed-games');
        const games: CompletedGame[] = await store.getAll();
        await transaction.done;
        return games;
    }

    public static async delete(id: string): Promise<void> {
        const database = await openDatabase();
        const transaction = database.transaction('completed-games', 'readwrite');
        const store = transaction.objectStore('completed-games');
        store.delete(id);
        await transaction.done;
    }
}