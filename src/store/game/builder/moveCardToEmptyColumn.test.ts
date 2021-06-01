import { emptySolitaire, fetchCard, makeCardLocationAware } from 'lib/util';
import { SUIT_TYPE_SPADE } from 'types/suit';
import { generateDeck } from '../initialiseGame';
import { moveCardToEmptyColumn } from './moveCardToEmptyColumn';

const deck = generateDeck();
const aceOfSpades = fetchCard(deck, 'A', SUIT_TYPE_SPADE);
const solitaire = emptySolitaire('final-test');

solitaire.columns.one.push(aceOfSpades);

test('If a invalid location is used for moveCardToEmptyColumn', () => {
    expect(moveCardToEmptyColumn(solitaire, {
        drag: makeCardLocationAware(aceOfSpades, 'columns', 'two'),
        column: 'one'
    })).toStrictEqual(solitaire);
});