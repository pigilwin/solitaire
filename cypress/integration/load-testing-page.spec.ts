it('should load the page and unlock the testing page then navigate there', () => {

    cy.visit('/');

    cy.dataCy('logo').as('logoElement');

    cy.get('@logoElement').click();
    cy.get('@logoElement').click();
    cy.get('@logoElement').click();
    cy.get('@logoElement').click();
    cy.get('@logoElement').click();
    cy.get('@logoElement').click();
    cy.get('@logoElement').click();

    cy.dataCy('cy-testing').click({
        force: true
    });

    cy.location().should((loc) => {
        // eslint-disable-next-line jest/valid-expect
        expect(loc.href).to.contain('testing');
    });
});