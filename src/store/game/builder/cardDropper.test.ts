import { emptySolitaire, fetchCard } from 'lib/util';
import { SUIT_TYPE_CLUB, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from 'types/suit';
import { generateDeck } from '../initialiseGame';
import { canCardBeDroppedOnToFinal, canCardBeDroppedOnToColumn } from './cardDropper';

const deck = generateDeck();
const aceOfClubs = fetchCard(deck, 'A', SUIT_TYPE_CLUB);
const twoOfClubs = fetchCard(deck, '2', SUIT_TYPE_CLUB);
const nineOfSpades = fetchCard(deck, '9', SUIT_TYPE_SPADE);
const eightOfHearts = fetchCard(deck, '8', SUIT_TYPE_HEART);

test('Does the same color fail for canCardBeDroppedOnToColumn', () => {
    expect(canCardBeDroppedOnToColumn(nineOfSpades, nineOfSpades)).toBeFalsy();
});

test('Does canCardBeDroppedOnToColumn work', () => {
    expect(canCardBeDroppedOnToColumn(eightOfHearts, nineOfSpades)).toBeTruthy();
});

test('Does the card fail on the wrong suit', () => {
    expect(canCardBeDroppedOnToFinal(aceOfClubs, SUIT_TYPE_HEART, [])).toBeFalsy();
});

test('Does a ACE card correctly drop onto the column', () => {
    expect(canCardBeDroppedOnToFinal(aceOfClubs, SUIT_TYPE_CLUB, [])).toBeTruthy();
});

test('If no cards exist on the column does it fail', () => {
    expect(canCardBeDroppedOnToFinal(eightOfHearts, SUIT_TYPE_HEART, [])).toBeFalsy();
});

test('Does canCardBeDroppedOnToFinal work', () => {
    const solitaire = emptySolitaire('test');
    solitaire.final.club.push(aceOfClubs);
    expect(canCardBeDroppedOnToFinal(twoOfClubs, SUIT_TYPE_CLUB, solitaire.final.club)).toBeTruthy();
});