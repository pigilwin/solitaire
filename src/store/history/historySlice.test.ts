import { emptySolitaire } from 'lib/util';
import { Game } from 'types/game';
import { initialiseStore } from '../index';
import { 
    addGameToHistoryAction,
    latestHistoryGameSelector,
    addScoreToHistoryAction,
    latestHistoryScoreSelector,
    removeLatestHistoryItemAction,
    removeLatestScoreAction,
    doWeHaveAnyHistorySelector,
    clearHistoryAction
} from './historySlice';

test('Can a game be added to the history and then retrieved', () => {
    const game: Game = {
        generatedByTesting: true,
        game: emptySolitaire('empty-game')
    };
    const store = initialiseStore();
    store.dispatch(addGameToHistoryAction(game));
    expect(latestHistoryGameSelector(store.getState())).toStrictEqual(game);
});

test('Can score be added to the history and then retrieved', () => {
    const score = 20;
    const store = initialiseStore();
    store.dispatch(addScoreToHistoryAction(score));
    expect(latestHistoryScoreSelector(store.getState())).toBe(score);
});

test('Can a game object be added then removed', () => {
    const firstGame: Game = {
        generatedByTesting: true,
        game: emptySolitaire('first-game')
    };

    const secondGame: Game = {
        generatedByTesting: true,
        game: emptySolitaire('second-game')
    };

    const store = initialiseStore();
    store.dispatch(addGameToHistoryAction(firstGame));
    store.dispatch(addGameToHistoryAction(secondGame));

    /**
     * Does the game match the second Game
     */
    expect(latestHistoryGameSelector(store.getState())).toStrictEqual(secondGame);

    store.dispatch(removeLatestHistoryItemAction());

    /**
     * Does the game match the first game
     */
     expect(latestHistoryGameSelector(store.getState())).toStrictEqual(firstGame);
});

test('Can a score value be added then removed', () => {
    const firstScore = 10;
    const secondScore = 30;

    const store = initialiseStore();
    store.dispatch(addScoreToHistoryAction(firstScore));
    store.dispatch(addScoreToHistoryAction(secondScore));

    /**
     * Does the game match the second Game
     */
    expect(latestHistoryScoreSelector(store.getState())).toStrictEqual(secondScore);

    store.dispatch(removeLatestScoreAction());

    /**
     * Does the game match the first game
     */
     expect(latestHistoryScoreSelector(store.getState())).toStrictEqual(firstScore);
});

test('Can a game be added then the state reset', () => {
    const firstGame: Game = {
        generatedByTesting: true,
        game: emptySolitaire('first-game')
    };

    const store = initialiseStore();
    store.dispatch(addGameToHistoryAction(firstGame));

    /**
     * Does the game match the second Game
     */
    expect(doWeHaveAnyHistorySelector(store.getState())).toBeTruthy()

    store.dispatch(clearHistoryAction());

    /**
     * Does the game match the first game
     */
     expect(doWeHaveAnyHistorySelector(store.getState())).toBeFalsy();
});