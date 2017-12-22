'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UI - DELETE
 ***********************************************************************************************************************************************
 * @description
 */

describe('Continuum - Delete Operations', () => {
  it('Should delete a user', () => {
    cy.visit(Cypress.env('host'))
      .wait(1000)
      .get('.users-table tbody tr').then(rows => {
        let length = rows.length;

        cy.get('.users-table tbody tr:first button').click().wait(1000)
          .get('.users-table tbody tr').should('have.length', length-1)
      })
  });
});
