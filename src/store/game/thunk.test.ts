import { initialiseStore } from 'store';
import { currentGameSelector } from './gameSlice';
import { drawCardFromDeckAsync, initialiseGameAsync, moveCardToColumnAsync, moveCardToEmptyColumnAsync, moveCardToFinalColumnAsync, refreshRemaningFromDrawAsync } from './thunk';
import { replaceGameAction } from './gameSlice';
import { Game } from 'types/game';
import { generateDeck } from './initialiseGame';
import { fetchCard, makeCardLocationAware } from 'lib/util';
import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from 'types/suit';

const deck = generateDeck();
const kingOfHearts = fetchCard(deck, 'K', SUIT_TYPE_HEART);
const kingOfClubs = fetchCard(deck, 'K', SUIT_TYPE_CLUB);
const kingOfSpades = fetchCard(deck, 'K', SUIT_TYPE_SPADE);
const kingOfDiamonds = fetchCard(deck, 'K', SUIT_TYPE_DIAMOND);
const queenOfHearts = fetchCard(deck, 'Q', SUIT_TYPE_HEART);
const queenOfSpades = fetchCard(deck, 'Q', SUIT_TYPE_SPADE);
const aceOfSpades = fetchCard(deck, 'A', SUIT_TYPE_SPADE);
const aceOfHearts = fetchCard(deck, 'A', SUIT_TYPE_HEART);
const twoOfHearts = fetchCard(deck, '2', SUIT_TYPE_HEART);

const game: Game = {
    generatedByTesting: true,
    game: {
        id: 'testing',
        columns: {
            one: [kingOfClubs, queenOfHearts],
            two: [kingOfSpades],
            three: [kingOfHearts],
            four: [],
            five: [],
            six: [twoOfHearts],
            seven: []
        },
        final: {
            club: [],
            spade: [aceOfSpades],
            heart: [aceOfHearts],
            diamond: []
        },
        draw: {
            current: [queenOfSpades],
            remaining: [kingOfDiamonds]
        }
    }
};

test('Can a game be initialised in the store', () => {
    const store = initialiseStore();
    store.dispatch(initialiseGameAsync());
    expect(currentGameSelector(store.getState()).id.length).toBeGreaterThan(0);
});

test('Can the remaning cards be refershed in the draw', () => {
    const store = initialiseStore();
    store.dispatch(initialiseGameAsync());
    store.dispatch(refreshRemaningFromDrawAsync());
    expect(currentGameSelector(store.getState()).id.length).toBeGreaterThan(0);
});

test('Can a card be drawn from the deck', () => {
    const store = initialiseStore();
    store.dispatch(initialiseGameAsync());
    expect(currentGameSelector(store.getState()).draw.current.length).toBe(0);
    store.dispatch(drawCardFromDeckAsync());
    expect(currentGameSelector(store.getState()).draw.current.length).toBe(1);
});

test('Move a card from the columns to columns', () => {
    const store = initialiseStore();
    store.dispatch(replaceGameAction(game));
    expect(currentGameSelector(store.getState()).columns.one.length).toBe(2);
    
    store.dispatch(moveCardToColumnAsync({
        drop: makeCardLocationAware(kingOfSpades, 'columns', 'two'),
        drag: makeCardLocationAware(queenOfHearts, 'columns', 'one')
    }));

    expect(currentGameSelector(store.getState()).columns.one.length).toBe(1);
});

test('Move a card from draw to columns', () => {
    const store = initialiseStore();
    store.dispatch(replaceGameAction(game));
    expect(currentGameSelector(store.getState()).draw.current.length).toBe(1);
    
    store.dispatch(moveCardToColumnAsync({
        drop: makeCardLocationAware(kingOfHearts, 'columns', 'three'),
        drag: makeCardLocationAware(queenOfSpades, 'draw', 'current')
    }));

    expect(currentGameSelector(store.getState()).columns.three.length).toBe(2);
});

test('Move a card from final to columns', () => {
    const store = initialiseStore();
    store.dispatch(replaceGameAction(game));
    expect(currentGameSelector(store.getState()).final.spade.length).toBe(1);
    
    store.dispatch(moveCardToColumnAsync({
        drop: makeCardLocationAware(twoOfHearts, 'columns', 'six'),
        drag: makeCardLocationAware(aceOfSpades, 'final', 'spade')
    }));

    expect(currentGameSelector(store.getState()).columns.six.length).toBe(2);
});

test('Move a king to a empty column', () => {
    const store = initialiseStore();
    store.dispatch(replaceGameAction(game));
    expect(currentGameSelector(store.getState()).columns.seven.length).toBe(0);
    
    store.dispatch(moveCardToEmptyColumnAsync({
        column: 'seven',
        drag: makeCardLocationAware(kingOfSpades, 'columns', 'two')
    }));

    expect(currentGameSelector(store.getState()).columns.seven.length).toBe(1);
});

test('Move a card from draw to a empty column', () => {
    const store = initialiseStore();
    store.dispatch(replaceGameAction(game));
    expect(currentGameSelector(store.getState()).draw.current.length).toBe(1);

    store.dispatch(drawCardFromDeckAsync());

    expect(currentGameSelector(store.getState()).draw.current.length).toBe(2);
    
    store.dispatch(moveCardToEmptyColumnAsync({
        column: 'seven',
        drag: makeCardLocationAware(kingOfDiamonds, 'draw', 'current')
    }));

    expect(currentGameSelector(store.getState()).columns.seven.length).toBe(1);
});

test('Can a card be moved to the final', () => {
    const store = initialiseStore();
    store.dispatch(replaceGameAction(game));

    store.dispatch(moveCardToFinalColumnAsync({
        drag: makeCardLocationAware(twoOfHearts, 'columns', 'two'),
        column: 'hearts'
    }));
});