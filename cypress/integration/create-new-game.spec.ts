it('should load the page and create a new game', () => {
    /**
     * Load the main page
     */
    cy.visit('/');

    /**
     * Click the new game button
     */
    cy.dataCy('cy-new-game').click();
});