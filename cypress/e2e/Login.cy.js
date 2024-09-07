/* eslint-disable no-undef */

describe('CP-001 Login', () => {
  it('Succesfully login', () => {
    cy.visit('http://localhost:5173/')
    cy.get('input[name="email"]').type('kevin@mail.com')
    cy.get('input[name="password"]').type('kevin123')
    cy.get('#login-button').click()
    cy.url().should('include', '/dashboard')
  })
})