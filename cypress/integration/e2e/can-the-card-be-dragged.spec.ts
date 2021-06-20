it('Can the card be dragged', () => {
    cy.enableTesting();

    cy.visit('/testing');

    cy.dataCy('cy-testing-multiple-options').click();

    cy.dragToHere('draggable-6-CLUB', 'droppable-7-HEART');
});