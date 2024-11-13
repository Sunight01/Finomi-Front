/* eslint-disable no-undef */

// describe('CP-010 Wallet', () => {
//   it('Create a transaction', () => {
//     cy.visit('http://localhost:5173/')
//     cy.login('testing@mail.com', 'testing123')
//     cy.walletPage()
//     cy.createTransaction('Test', '100', 'Gasto', '2024-11-10', 'Trabajo', 'Descripción')
//     cy.url().should('include', '/wallet')
//   })
// })

describe('CP-011 Wallet: invalid form', () => {
  it('Empty transaction', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.walletPage()
    cy.createTransaction()
    cy.contains('El título es obligatorio').should('be.visible')
    cy.contains('El monto debe ser mayor o igual a 0').should('be.visible')
    cy.contains('El tipo es obligatorio').should('be.visible')
    cy.contains('La fecha es obligatoria').should('be.visible')
    cy.contains('El tag es obligatorio').should('be.visible')
  })
})

describe('CP-012 Wallet: invalid form', () => {
  it('Empty title', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.walletPage()
    cy.createTransaction('', 100, 'Gasto', '2024-11-10', 'Trabajo', 'Descripción')
    cy.contains('El título es obligatorio').should('be.visible')
  })
})

describe('CP-013 Wallet: invalid form', () => {
  it('Empty type', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.walletPage()
    cy.createTransaction('test', 100, '', '2024-11-10', 'Trabajo', 'Descripción')
    cy.contains('El tipo es obligatorio').should('be.visible')
  })
})

describe('CP-014 Wallet: invalid form', () => {
  it('Empty date', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.walletPage()
    cy.createTransaction('test', 100, 'Ingreso', '', 'Trabajo', 'Descripción')
    cy.contains('La fecha es obligatoria').should('be.visible')
  })
})

describe('CP-015 Wallet: invalid form', () => {
  it('Wrong type of amount', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.walletPage()
    cy.createTransaction('test', 'aa', 'Ingreso', '2024-11-10', 'Trabajo', 'Descripción')
    cy.contains('El monto debe ser mayor o igual a 0').should('be.visible')
  })
})

describe('CP-016 Wallet: invalid form', () => {
  it('Empty tag', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.walletPage()
    cy.createTransaction('test', 100, 'Ingreso', '2024-11-10', '', 'Descripción')
    cy.contains('El tag es obligatorio').should('be.visible')

  })
})

describe('CP-017 Wallet: invalid form', () => {
  it('Empty desc', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.walletPage()
    cy.createTransaction('test', '100', 'Ingreso', '2024-11-10', 'Trabajo', '')
    cy.url().should('include', '/wallet')
  })
})
