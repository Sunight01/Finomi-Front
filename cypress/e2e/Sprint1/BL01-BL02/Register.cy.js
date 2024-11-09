/* eslint-disable no-undef */

describe('CP-001 Register', () => {
  it('Succesfully register', () => {
    cy.visit('http://localhost:5173/')
    cy.register('Testing', 'testing@mail.com', 'testing123')
    cy.url().should('include', '/dashboard')
  })
})

describe('CP-002 Register: invalid password', () => {
  it('Invalid password: has less than 6 characters', () => {
    cy.visit('http://localhost:5173/')
    cy.register('Testing', 'testing@mail.com', 'test')
    cy.contains('La contraseña debe tener al menos 6 caracteres').should('be.visible');
  })
})

describe('CP-003 Register: empty email', () => {
  it('Invalid email: empty', () => {
    cy.visit('http://localhost:5173/')
    cy.register('testing', ' ', 'testing')
    cy.contains('Email es requerido').should('be.visible');
  })
})

describe('CP-004 Register: empty username', () => {
  it('Invalid username: empty', () => {
    cy.visit('http://localhost:5173/')
    cy.register('', 'tesing@mail.com', 'testing')
    cy.contains('Nombre es requerido').should('be.visible');
  })
})

describe('CP-005 Register: empty form', () => {
  it('Invalid form: empty', () => {
    cy.visit('http://localhost:5173/')
    cy.register('', '', '')
    cy.contains('Nombre es requerido').should('be.visible')
    cy.contains('Email es requerido').should('be.visible')
    cy.contains('La contraseña es obligatoria').should('be.visible')
  })
})
