import {initialiseStore} from '../index';
import { ADD_TO_FINAL, FROM_DRAW, LOSS_FOR_DRAW_RESET } from './scoreConstants';
import {
    currentMovesSelector,
    currentScoreSelector,
    initialState,
    incrementScoreAction,
    addMoveAction,
    clearTrackerAction,
    fetchTracker,
    decrementScoreAction,
    replaceScoreAction
} from './trackerSlice';

test('Can a move be added to the tracker', () => {
    const store = initialiseStore();
    store.dispatch(addMoveAction());
    expect(currentMovesSelector(store.getState())).toBe(1);
});

test('Can the score be incremented', () => {
    const store = initialiseStore();
    store.dispatch(incrementScoreAction(FROM_DRAW));
    expect(currentScoreSelector(store.getState())).toBe(FROM_DRAW);
});

test('Can the tracker be reset', () => {
    const store = initialiseStore();
    store.dispatch(incrementScoreAction(FROM_DRAW));
    expect(currentScoreSelector(store.getState())).toBe(FROM_DRAW);
    store.dispatch(clearTrackerAction());
    expect(fetchTracker(() => {
        return store.getState();
    })).toStrictEqual(initialState);
});

test('Can score be added then removed', () =>  {
    const store = initialiseStore();
    store.dispatch(incrementScoreAction(ADD_TO_FINAL * 6));
    expect(currentScoreSelector(store.getState())).toBe(ADD_TO_FINAL * 6);
    store.dispatch(decrementScoreAction(LOSS_FOR_DRAW_RESET));
    expect(currentScoreSelector(store.getState())).toBe(ADD_TO_FINAL);
});

test('Can score just be replaced', () =>  {
    const store = initialiseStore();
    store.dispatch(incrementScoreAction(ADD_TO_FINAL * 2));
    expect(currentScoreSelector(store.getState())).toBe(ADD_TO_FINAL * 2);
    store.dispatch(replaceScoreAction(20));
    expect(currentScoreSelector(store.getState())).toBe(20);
});