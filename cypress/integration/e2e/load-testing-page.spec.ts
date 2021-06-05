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

it('should allow access to the testing page if the local storage key is present', () => {

    cy.enableTesting();
    
    cy.visit('/');

    cy.dataCy('cy-testing').click({
        force: true
    });
});

it('Should click each testing element', () => {
    cy.enableTesting();

    cy.visit('/');

    for (const id of ['cy-testing-one-move-away', 'cy-testing-all-one-the-board', 'cy-testing-multiple-options', 'cy-testing-hide-page']){
        cy.visit('/testing');

        cy.dataCy(id).click();
    }
});