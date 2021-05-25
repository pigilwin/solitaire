import { openDatabase } from './database';

test('Can a database be created', async () => {
    require("fake-indexeddb/auto");
    const database = await openDatabase();
    expect(database).toBeInstanceOf(IDBDatabase);
});