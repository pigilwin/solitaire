import { fetchCard, makeCardLocationAware } from 'lib/util';
import { generateDeck } from 'store/game/initialiseGame';
import { LocationAware } from 'types/game';
import { SUIT_TYPE_CLUB } from 'types/suit';
import { enhanceCard } from './enhancers';

const cards = generateDeck();
const aceOfClubs = fetchCard(cards, 'A', SUIT_TYPE_CLUB);
const kingOfClubs = fetchCard(cards, 'K', SUIT_TYPE_CLUB);
const queenOfClubs = fetchCard(cards, 'Q', SUIT_TYPE_CLUB);
const emptyCard: LocationAware = {
    location: {
        namespace: 'columns',
        area: 'two'
    }
};


test('Is card on final', () => {
    const finalAceOfClubs = makeCardLocationAware(aceOfClubs, 'final', 'clubs');
    expect(enhanceCard(finalAceOfClubs).isOnFinal()).toBeTruthy();
});

test('Is card on columns', () => {
    const finalAceOfClubs = makeCardLocationAware(aceOfClubs, 'columns', 'one');
    expect(enhanceCard(finalAceOfClubs).isOnColumns()).toBeTruthy();
});

test('Is card on draw', () => {
    const finalAceOfClubs = makeCardLocationAware(aceOfClubs, 'draw', 'current');
    expect(enhanceCard(finalAceOfClubs).isOnDraw()).toBeTruthy();
});

test('Is card identical', () => {
    const locationAware = makeCardLocationAware(aceOfClubs, 'columns', 'one');
    expect(enhanceCard(locationAware).isIdenticalToo(locationAware)).toBeTruthy();
    expect(enhanceCard(emptyCard).isIdenticalToo(locationAware)).toBeFalsy();
});

test('Does card have identical suit', () => {
    const locationAware = makeCardLocationAware(aceOfClubs, 'columns', 'one');
    expect(enhanceCard(locationAware).hasIdenticalSuit(locationAware)).toBeTruthy();
    expect(enhanceCard(emptyCard).hasIdenticalSuit(locationAware)).toBeFalsy();
});

test('Does card have identical color', () => {
    const locationAware = makeCardLocationAware(aceOfClubs, 'columns', 'one');
    expect(enhanceCard(locationAware).hasIdenticalColour(locationAware)).toBeTruthy();
    expect(enhanceCard(emptyCard).hasIdenticalColour(locationAware)).toBeFalsy();
});

test('Is the card a king', () => {
    const locationAware = makeCardLocationAware(kingOfClubs, 'columns', 'one');
    expect(enhanceCard(locationAware).isAKing()).toBeTruthy();
    expect(enhanceCard(emptyCard).isAKing()).toBeFalsy();
});

test('Is the card a queen', () => {
    const locationAware = makeCardLocationAware(queenOfClubs, 'columns', 'one');
    expect(enhanceCard(locationAware).isAQueen()).toBeTruthy();
    expect(enhanceCard(emptyCard).isAQueen()).toBeFalsy();
});

test('Is the card a ace', () => {
    const locationAware = makeCardLocationAware(aceOfClubs, 'columns', 'one');
    expect(enhanceCard(locationAware).isAAce()).toBeTruthy();
    expect(enhanceCard(emptyCard).isAAce()).toBeFalsy();
});