/* eslint-disable no-undef */

describe('CP-006 Login', () => {
  it('Succesfully login', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.url().should('include', '/dashboard')
  })
})

describe('CP-007 Login: empty form', () => {
  it('Invalid form: empty', () => {
    cy.visit('http://localhost:5173/')
    cy.login('', '')
    cy.contains('El email es obligatorio').should('be.visible')
    cy.contains('La contraseña es obligatoria').should('be.visible')
  })
})

describe('CP-008 Login: wrong email', () => {
  it('Invalid form: empty', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@m', 'testing')
    cy.contains('Email inválido').should('be.visible')
  })
})

describe('CP-009 Login: wrong password', () => {
  it('Invalid form: empty', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'test')
    cy.contains('La contraseña debe tener al menos 6 caracteres').should('be.visible')
  })
})
