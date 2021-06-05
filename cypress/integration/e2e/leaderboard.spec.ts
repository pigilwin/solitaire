it('should save the game to the leaderboard', () => {
    cy.enableTesting();

    cy.createGameSavedToLeaderboard();
});

it('should save the game to the leaderboard, visit the leaderboard then go home', () => {
    cy.enableTesting();

    cy.createGameSavedToLeaderboard();

    cy.dataCy('cy-leaderboard').click({
        force: true
    });

    cy.dataCy('cy-leaderboard-go-home').click();
});