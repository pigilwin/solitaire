it('should load the settings page and change the card back', () => {
    cy.visit('/');

    cy.dataCy('cy-settings').click({
        force: true
    });

    cy.dataCy('new-card-back-chooser').click();

    cy.dataCy('card-back-color-BLUE').click();

    cy.dataCy('cy-settings-go-home').click();
});