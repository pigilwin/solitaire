import {store} from './index';

test('should create a store', () => {


    expect(store.getState().gameReducer.game.id).toBe('');

});