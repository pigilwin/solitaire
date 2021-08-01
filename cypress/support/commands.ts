// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('dataCy', (value: string) => {
    return cy.get(`[data-cy-test-id='${value}']`);
});

Cypress.Commands.add('enableTesting', () => {
  localStorage.setItem('USING_TESTING_ROUTES', 'YES');
});

Cypress.Commands.add('createCompletedGame', () => {
  
  cy.enableTesting();
  
  cy.visit('/');

  cy.dataCy('cy-testing').click({
      force: true
  });

  cy.dataCy('cy-testing-one-move-away').click();

  cy.dataCy("click-K-CLUB").click();

  cy.dataCy('choose-column-club').click();
});

Cypress.Commands.add('createCompletedGameAndSave', () => {

  cy.createCompletedGame();

  cy.dataCy('cy-confirm-save').click();

  cy.dataCy('cy-save-game').click();

  cy.dataCy('cy-player-name').type('Tim');

  cy.dataCy('cy-save-game').click();
});

// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    
    /**
     * Custom command to select DOM element by data-cy attribute.
     */
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to enable testing
     */
    enableTesting(): void;

    createCompletedGame(): void;

    createCompletedGameAndSave(): void;

    dragToHere(drag: string, drop: any): void;
  }
}