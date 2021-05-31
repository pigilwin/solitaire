import { generateGame } from './initialiseGame';

test('Can a valid game be created', () => {
    const game = generateGame();

    expect(game.columns.one.length).toBe(1);
    expect(game.columns.two.length).toBe(2);
    expect(game.columns.three.length).toBe(3);
    expect(game.columns.four.length).toBe(4);
    expect(game.columns.five.length).toBe(5);
    expect(game.columns.six.length).toBe(6);
    expect(game.columns.seven.length).toBe(7);
});