import { SUIT_TYPE_SPADE } from 'types/suit';
import { enhanceCard, enhanceSolitaire } from './enhancers';
import { emptySolitaire, makeCardLocationAware } from './util';
import { CardEnhancer } from './enhancers/cardEnhancer';
import { SolitaireEnhancer } from './enhancers/solitaireEnhancer';

test('Can a card be enchanced', () => {
    const card = makeCardLocationAware({
        index: 0,
        cardNumber: 'A',
        suit: SUIT_TYPE_SPADE,
        showing: false,
        color: "BLACK",
    }, 'final', 'spade');    
    expect(enhanceCard(card)).toBeInstanceOf(CardEnhancer);
});

test('Can a solitaire object be enchanced', () => {
    const solitaire = emptySolitaire();
    expect(enhanceSolitaire(solitaire)).toBeInstanceOf(SolitaireEnhancer);
});