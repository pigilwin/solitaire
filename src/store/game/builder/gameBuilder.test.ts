import { emptySolitaire, fetchCard, makeCardLocationAware } from 'lib/util';
import { SUIT_TYPE_CLUB, SUIT_TYPE_HEART } from 'types/suit';
import { generateDeck } from '../initialiseGame';
import { moveCard, refreshRemainingFromDraw } from './gameBuilder';

test('Does the refresh of remaining work', () => {
    const solitaire = emptySolitaire('test');
    const deck = generateDeck();
    solitaire.draw.current = deck;

    expect(solitaire.draw.current.length).toBe(deck.length);
    expect(solitaire.draw.remaining.length).toBe(0);

    const refreshed = refreshRemainingFromDraw(solitaire);
    
    expect(refreshed.draw.remaining.length).toBe(deck.length);
    expect(refreshed.draw.current.length).toBe(0);
});

test('Does the moveCard method do nothing if passed invalid instances', () => {

    const solitaire = emptySolitaire('test');
    const deck = generateDeck();
    const aceOfClubs = fetchCard(deck, 'A', SUIT_TYPE_CLUB);
    const twoOfHearts = fetchCard(deck, '2', SUIT_TYPE_HEART);

    solitaire.columns.one.push(aceOfClubs);
    solitaire.columns.two.push(twoOfHearts);

    expect(moveCard(solitaire, {
        drag: makeCardLocationAware(aceOfClubs, 'foo', 'bar'),
        drop: makeCardLocationAware(twoOfHearts, 'foo', 'bar')
    })).toStrictEqual(solitaire);
});

test('Does a invalid card cause the exact instance to be returned', () => {
    const solitaire = emptySolitaire('test');
    const deck = generateDeck();
    const aceOfClubs = fetchCard(deck, 'A', SUIT_TYPE_CLUB);
    const twoOfHearts = fetchCard(deck, '2', SUIT_TYPE_HEART);

    solitaire.columns.one.push(aceOfClubs);
    solitaire.columns.two.push(twoOfHearts);

    expect(moveCard(solitaire, {
        drag: makeCardLocationAware(aceOfClubs, 'columns', 'three'),
        drop: makeCardLocationAware(twoOfHearts, 'columns', 'two')
    })).toStrictEqual(solitaire);
});

test('Does empty current cause the game to return', () => {
    const solitaire = emptySolitaire('test');
    const deck = generateDeck();
    const aceOfClubs = fetchCard(deck, 'A', SUIT_TYPE_CLUB);
    const twoOfHearts = fetchCard(deck, '2', SUIT_TYPE_HEART);

    expect(moveCard(solitaire, {
        drag: makeCardLocationAware(aceOfClubs, 'draw', 'current'),
        drop: makeCardLocationAware(twoOfHearts, 'columns', 'two')
    })).toStrictEqual(solitaire);
});

test('Does moveCardFromFinalToColumn cause the game to return when a invalid index is found', () => {
    const solitaire = emptySolitaire('test');
    const deck = generateDeck();
    const aceOfClubs = fetchCard(deck, 'A', SUIT_TYPE_CLUB);
    const twoOfHearts = fetchCard(deck, '2', SUIT_TYPE_HEART);

    expect(moveCard(solitaire, {
        drag: makeCardLocationAware(aceOfClubs, 'final', 'club'),
        drop: makeCardLocationAware(twoOfHearts, 'columns', 'two')
    })).toStrictEqual(solitaire);
});