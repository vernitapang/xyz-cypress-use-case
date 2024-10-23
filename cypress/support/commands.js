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

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.Commands.add('loginCustomer', (user) => {
    cy.visit('/')
    cy.get(`[ng-click="customer()"]`).click()
    cy.get('select').select(user)
    cy.get('form.ng-valid > .btn').click()
})

Cypress.Commands.add('loginManager', (user) => {
    cy.visit('/')
    cy.get(`[ng-click="manager()"]`).click()
})