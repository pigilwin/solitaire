import { generateDeck } from 'store/game/initialiseGame';
import { SUIT_TYPE_HEART } from 'types/suit';
import { 
    columnFromLocation, 
    fetchCard, 
    finalFromLocation,
    findIndexOfCardWithinColumn,
    flipLatestCardInColumn,
    makeCardLocationAware,
    emptySolitaire
} from './util';

const cards = generateDeck();
const aceOfHearts = fetchCard(cards, 'A', SUIT_TYPE_HEART);

test('Can can a card be looked up by column location', () => {
    const fakeSolitaire = emptySolitaire();
    fakeSolitaire.columns.one.push(aceOfHearts);
    expect(columnFromLocation(fakeSolitaire,'columns', 'one').length).toBe(1);
});

test('Can can a card be looked up by final location', () => {
    const fakeSolitaire = emptySolitaire();
    fakeSolitaire.final.heart.push(aceOfHearts);
    expect(finalFromLocation(fakeSolitaire, 'heart').length).toBe(1);
});

test('Can can a card index be found within column', () => {
    const fakeSolitaire = emptySolitaire();
    fakeSolitaire.columns.one.push(aceOfHearts);
    expect(findIndexOfCardWithinColumn(fakeSolitaire.columns.one, makeCardLocationAware(aceOfHearts, 'columns', 'one'))).toBe(0);
});

test('Can the latest card in the column be flipped in the column', () => {
    const fakeSolitaire = emptySolitaire();
    fakeSolitaire.columns.one.push(aceOfHearts);
    const cardsForOne = columnFromLocation(fakeSolitaire,'columns', 'one');
    flipLatestCardInColumn(cardsForOne);
    expect(cardsForOne[0].showing).toBeTruthy();
});

test('Can no cards effect the flip latest card', () => {
    flipLatestCardInColumn([]);
    expect(true).toBeTruthy();
});