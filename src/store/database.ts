import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { CompletedGame } from './leaderboard/types';

export const openDatabase = async (): Promise<IDBPDatabase<SavedScores>> => {
    return await openDB<SavedScores>('solitaire', 1, {
        upgrade: (db) => {
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