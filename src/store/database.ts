import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { CompletedGame } from 'types/leaderboard';

export const openDatabase = async (): Promise<IDBPDatabase<SavedScores>> => {
    return await openDB<SavedScores>('solitaire', 1, {
        upgrade: (db: IDBPDatabase<SavedScores>) => {
            db.createObjectStore('completed-games');
        }
    });
}

interface SavedScores extends DBSchema {
    'completed-games': {
        key: string;
        value: CompletedGame;
    }
}