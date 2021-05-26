import { generateOneMoveAwayGame } from 'lib/testing/generateOneMoveAwayGame';
import { emptySolitaire, fetchCard, makeCardLocationAware } from 'lib/util';
import { generateDeck } from 'store/game/initialiseGame';
import { SolitaireCard } from 'types/game';
import { SUIT_TYPE_CLUB, SUIT_TYPE_HEART } from 'types/suit';
import { enhanceSolitaire } from './enhancers';

test('Do any card exist as children', () => {
    const deck = generateDeck();
    const empty = emptySolitaire('empty-game');
    
    const aceOfClubs = fetchCard(deck, 'A', SUIT_TYPE_CLUB);
    const twoOfHearts = fetchCard(deck, '2', SUIT_TYPE_HEART);

    empty.columns.one.push(twoOfHearts, aceOfClubs);

    const lookup = makeCardLocationAware(twoOfHearts, 'columns', 'one');

    expect(enhanceSolitaire(empty).doAnyCardsExistAsChildren(lookup)).toBeTruthy();
});

test('Is the game complete', () => {
    const solitaire = generateOneMoveAwayGame().game;
    const king = solitaire.columns.one.pop() as SolitaireCard;
    solitaire.final.club.push(king);
    expect(enhanceSolitaire(solitaire).isGameComplete()).toBeTruthy();
});

test('Is the game complete with empty final', () => {
    const solitaire = generateOneMoveAwayGame().game;

    solitaire.final.club = [];

    expect(enhanceSolitaire(solitaire).isGameComplete()).toBeFalsy();
});