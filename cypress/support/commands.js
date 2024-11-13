/* eslint-disable no-undef */
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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  email && cy.get('input[name="email"]').type(email);
  password && cy.get('input[name="password"]').type(password);
  cy.get("#login-button").click();
});

Cypress.Commands.add("register", (username, email, password) => {
  cy.get("#register-button").click();
  username && cy.get('input[name="username"]').type(username);
  email && cy.get('input[name="email"]').type(email);
  password && cy.get('input[name="password"]').type(password);
  cy.get("#register-submit-button").click();
});

Cypress.Commands.add("walletPage", () => {
  cy.wait(1000);
  cy.visit("/wallet");
});

Cypress.Commands.add("createTransaction", (title, amount, type, date, tag, description) => {
  cy.wait(1000);
  cy.get("#wallet-create-button").click();
  title && cy.get('input[name="title"]').type(title);
  amount && cy.get('input[name="amount"]').type(amount);
  type && cy.get('#type').click();
  if (type === 'Gasto') {
    cy.get("#type-gasto").click();
  }
  if (type === 'Ingreso') {
    cy.get("#type-ingreso").click();
  }
  date && cy.get('input[name="date"]').type(date);
  tag && cy.get('#tag').click();
  tag && cy.get(`[data-value=${tag}]`).click();
  description && cy.get('#description').type(description);
  cy.get('#create-submit-button').click();
});
