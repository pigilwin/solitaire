import { generateOneMoveAwayGame } from 'lib/testing/generateOneMoveAwayGame';
import { initialiseStore } from 'store';
import { clearGameAction, currentGameSelector, isGameGeneratedByTestingSelector, replaceGameAction } from './gameSlice';
import { initialiseGameAsync } from './thunk';

test('Can a game be destoryed', () => {
    const store = initialiseStore();
    store.dispatch(initialiseGameAsync());
    expect(currentGameSelector(store.getState()).id.length).toBeGreaterThan(0);
    store.dispatch(clearGameAction());
    expect(currentGameSelector(store.getState()).id.length).toBe(0);
});

test('Can a game be created in testing mode', () => {
    const store = initialiseStore();
    const game = generateOneMoveAwayGame();
    store.dispatch(replaceGameAction(game));
    expect(isGameGeneratedByTestingSelector(store.getState())).toBeTruthy();
});