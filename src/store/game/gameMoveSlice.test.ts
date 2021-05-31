import { fetchCard, makeCardLocationAware } from "lib/util";
import { initialiseStore } from "store";
import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART } from "types/suit";
import { cardWantingToBeMovedSelector, potentialMoveLocationsSelector, updatePossibleMovesAction, clearPossibleMovesAction } from "./gameMoveSlice";
import { generateDeck } from "./initialiseGame";

test('Can cards wanting to be moved be updated then cleared', () => {
    const store = initialiseStore();
    const deck = generateDeck();

    const fiveOfClubs = makeCardLocationAware(fetchCard(deck, '5', SUIT_TYPE_CLUB), 'columns', 'one');
    const sixOfHearts = fetchCard(deck, '6', SUIT_TYPE_HEART);
    const sixOfDiamonds = fetchCard(deck, '6', SUIT_TYPE_DIAMOND);

    store.dispatch(updatePossibleMovesAction({
        cardWantingToBeMoved: fiveOfClubs,
        potentialMoves: {
            'two': makeCardLocationAware(sixOfHearts, 'columns', 'two'),
            'three': makeCardLocationAware(sixOfDiamonds, 'columns', 'three')
        }
    }));
    expect(cardWantingToBeMovedSelector(store.getState())).toStrictEqual(fiveOfClubs);
    expect(Object.keys(potentialMoveLocationsSelector(store.getState())).length).toBe(2);

    store.dispatch(clearPossibleMovesAction());

    expect(Object.keys(potentialMoveLocationsSelector(store.getState())).length).toBe(0);
});