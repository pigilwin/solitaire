import {initialiseStore} from './index';

test('should create a store', () => {
    expect(initialiseStore().getState().gameReducer.game.id).toBe('');
});