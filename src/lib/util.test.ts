import { generateDeck } from 'store/game/initialiseGame';
import { Solitaire } from 'types/game';
import { SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from 'types/suit';
import { 
    columnFromLocation, 
    fetchCard, 
    finalFromLocation,
    findIndexOfCardWithinColumn,
    flipLatestCardInColumn,
    isOnFinal,
    isOnColumns,
    isOnDraw,
    makeCardLocationAware
} from './util';

const cards = generateDeck();
const aceOfHearts = fetchCard(cards, 'A', SUIT_TYPE_HEART);
const fakeSolitaire: Solitaire = {
    id: 'foo',
    columns: {
        one: [aceOfHearts],
        two: [],
        three: [],
        four: [],
        five: [],
        six: [],
        seven: []
    },
    final: {
        heart: [fetchCard(cards, 'A', SUIT_TYPE_SPADE)],
        diamond: [],
        spade: [],
        club: []
    },
    draw: {
        remaining: [],
        current: []
    }
};


test('Can can a card be looked up by column location', () => {
    expect(columnFromLocation(fakeSolitaire,'columns', 'one').length).toBe(1);
});

test('Can can a card be looked up by final location', () => {
    expect(finalFromLocation(fakeSolitaire, 'heart').length).toBe(1);
});

test('Can can a card index be found within column', () => {
    expect(findIndexOfCardWithinColumn(fakeSolitaire.columns.one, makeCardLocationAware(aceOfHearts, 'columns', 'one'))).toBe(0);
});

test('Can the latest card in the column be flipped in the column', () => {
    const cardsForOne = columnFromLocation(fakeSolitaire,'columns', 'one');
    flipLatestCardInColumn(cardsForOne);
    expect(cardsForOne[0].showing).toBeTruthy();
});

test('Can no cards effect the flip latest card', () => {
    flipLatestCardInColumn([]);
    expect(true).toBeTruthy();
});

test('Is the card identifiable for final', () => {
    const final = makeCardLocationAware(aceOfHearts, 'final', 'hearts');
    expect(isOnFinal(final)).toBeTruthy();
});

test('Is the card identifiable for draw', () => {
    const draw = makeCardLocationAware(aceOfHearts, 'draw', 'current');
    expect(isOnDraw(draw)).toBeTruthy();
});

test('Is the card identifiable for columns', () => {
    const columnOne = makeCardLocationAware(aceOfHearts, 'columns', 'one');
    expect(isOnColumns(columnOne)).toBeTruthy();
});