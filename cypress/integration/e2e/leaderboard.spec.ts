it('should save the game to the leaderboard', () => {
    cy.enableTesting();

    cy.createCompletedGameAndSave();
});

it('should save the game to the leaderboard, visit the leaderboard then go home', () => {
    cy.enableTesting();

    cy.createCompletedGameAndSave();

    cy.dataCy('cy-leaderboard').click({
        force: true
    });

    cy.dataCy('cy-leaderboard-go-home').click();
});

it('should complete the game the dismiss the save option', () => {
    cy.enableTesting();

    cy.createCompletedGame();

    cy.dataCy('cy-do-not-save').click();
});