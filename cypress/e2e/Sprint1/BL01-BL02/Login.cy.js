/* eslint-disable no-undef */

describe('CP-001 Login', () => {
  it('Succesfully login', () => {
    cy.visit('http://localhost:5173/')
    cy.login('kevin@mail.com', 'kevin123')
    cy.url().should('include', '/dashboard')
  })
})

describe('CP-002 Login: invalid password', () => {
  it('Invalid password: has less than 6 characters', () => {
    cy.visit('http://localhost:5173/')
    cy.login('kevin@mail.com', 'test')
    cy.contains('La contraseña debe tener al menos 6 caracteres').should('be.visible');
  })
})