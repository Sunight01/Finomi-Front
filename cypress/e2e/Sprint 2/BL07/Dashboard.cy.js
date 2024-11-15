/* eslint-disable no-undef */

describe('CP-027 Dashboard', () => {
  it('Empty dashboard', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.wait(1000)
    cy.get('#benefits').should('contain', '$0')
    cy.get('#incomes').should('contain', '$0')
    cy.get('#expenses').should('contain', '$0')
  })
})

describe('CP-028 Dashboard', () => {
  it('dashboard with transactions', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.wait(800)
    cy.get('#incomes').should('not.contain', '$0')
    cy.get('#expenses').should('not.contain', '$0')
  })
})
