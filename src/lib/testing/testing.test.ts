import { generateAllOneTheBoardGame } from './generateAllOnTheBoardGame';
import { generateOnTheBoardWithMultipleOptions } from './generateOnTheBoardWithMultipleOptions';
import { generateOneMoveAwayGame } from './generateOneMoveAwayGame';

test('Does the test generate correctly for all on the board', () => {
    expect(generateAllOneTheBoardGame().generatedByTesting).toBeTruthy();
});

test('Does the test generate correctly for one move away', () => {
    expect(generateOneMoveAwayGame().generatedByTesting).toBeTruthy();
});

test('Does the test generate correctly for multiple options', () => {
    expect(generateOnTheBoardWithMultipleOptions().generatedByTesting).toBeTruthy();
});