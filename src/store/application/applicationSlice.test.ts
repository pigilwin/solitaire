import {store} from '../index';
import { 
    allowedToSeeTestingRouteAction,
    applyNewCardBackAction,
    areWeAllowedToSeeTestingRouteSelector,
    currentlySelectedCardBackSelector 
} from './applicationSlice';

test('Can the card back be changed', () => {
    const cardBack = 'RED';
    store.dispatch(applyNewCardBackAction(cardBack));
    expect(currentlySelectedCardBackSelector(store.getState())).toBe(cardBack);
});

test('Can the testing routes be enabled', () => {
    store.dispatch(allowedToSeeTestingRouteAction(true));
    expect(areWeAllowedToSeeTestingRouteSelector(store.getState())).toBeTruthy();
});

test('Can the testing routes be disabled', () => {
    store.dispatch(allowedToSeeTestingRouteAction(false));
    expect(areWeAllowedToSeeTestingRouteSelector(store.getState())).toBeFalsy();
});