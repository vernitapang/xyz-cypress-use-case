const customer = require('../../fixtures/customer.json')
describe('Login', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('verifies login page elements', () => {+
        cy.get(".home").should('be.visible', 'have.text', 'Home')
        cy.get(".mainHeading").should('be.visible', 'have.text', 'XYZ Bank')
        cy.get('button[ng-click="customer()"]').should('be.visible', 'have.text', 'Customer Login')
        cy.get('button[ng-click="manager()"]').should('be.visible', 'have.text', 'Bank Manager Login')
    });

    it('login as customer', () => {
        cy.get('[ng-click="customer()"]').click()
        cy.get('select').select(customer[1])
        cy.get('button[type="submit"]').click()
        cy.get('.fontBig').should('have.text', customer[1])
    });
});