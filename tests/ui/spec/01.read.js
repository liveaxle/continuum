'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UI - READ
 ***********************************************************************************************************************************************
 * @description
 */
describe('Continuum - Read Operations', () => {
  it('Should present a list of users', () => {
    cy.visit(Cypress.env('host'))
      .wait(1000)
      .get('.users-table tbody tr')
      .should('to.have.length.above', 0);
  });
});
