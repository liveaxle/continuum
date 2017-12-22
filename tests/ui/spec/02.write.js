'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - TESTS - UI - WRITE
 ***********************************************************************************************************************************************
 * @description
 */
const USER = {
  create: {
    first_name: 'Ken',
    last_name: 'Stowell',
    age: '34'
  },
  update: {
    first_name: 'Merp',
    last_name: 'Derp',
    age: '10000'
  }
};

describe('Continuum - Write Operations', () => {
  it('Should create a user', () => {
    cy.visit(Cypress.env('host'))
      .wait(1000)
      .get('.create-user tbody tr td input:first').clear().type(USER.create.first_name)
      .get('.create-user tbody tr td input:nth-child(2)').clear().type(USER.create.last_name)
      .get('.create-user tbody tr td input:nth-child(3)').clear().type(USER.create.age)
      .get('.create-user tbody tr td button').click().wait(1000)
      .get('.users-table tbody tr:first td:first input').should('have.value', USER.create.first_name)
      .get('.users-table tbody tr:first td:nth-child(2) input').should('have.value', USER.create.last_name)
      .get('.users-table tbody tr:first td:nth-child(3) input').should('have.value', USER.create.age);
  });

  it('Should update a user', () => {
    cy.visit(Cypress.env('host'))
      .wait(1000)
      .get('.users-table tbody tr:first td:first input').clear().type(USER.update.first_name)
      .get('.users-table tbody tr:first td:nth-child(2) input').clear().type(USER.update.last_name)
      .get('.users-table tbody tr:first td:nth-child(3) input').clear().type(USER.update.age)
      .wait(1000)
      .reload()
      .wait(1000)
      .get('.users-table tbody tr:first td:first input').should('have.value', USER.update.first_name)
      .get('.users-table tbody tr:first td:nth-child(2) input').should('have.value', USER.update.last_name)
      .get('.users-table tbody tr:first td:nth-child(3) input').should('have.value', USER.update.age);
  });
});
