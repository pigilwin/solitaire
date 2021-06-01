import { emptySolitaire, fetchCard, makeCardLocationAware } from 'lib/util';
import { SUIT_TYPE_SPADE } from 'types/suit';
import { generateDeck } from '../initialiseGame';
import { moveCardToFinalColumn } from './moveCardToFinalColumn';

const deck = generateDeck();
const aceOfSpades = fetchCard(deck, 'A', SUIT_TYPE_SPADE);
const solitaire = emptySolitaire('final-test');

solitaire.columns.one.push(aceOfSpades);


test('Can a card be moved to the final column', () => {
    
    expect(solitaire.final.spade.length).toBe(0);

    expect(moveCardToFinalColumn(solitaire, {
        drag: makeCardLocationAware(aceOfSpades, 'columns', 'one'),
        column: 'spade'
    }).final.spade.length).toBe(1);
});