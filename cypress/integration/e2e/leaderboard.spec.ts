it('should save the game to the leaderboard', () => {
    cy.enableTesting();

    cy.createGameSavedToLeaderboard();
});

it('should save the game to the leaderboard then delete the record', () => {
    cy.enableTesting();

    cy.createGameSavedToLeaderboard();

    cy.dataCy('cy-leaderboard').click({
        force: true
    });
});