const customer = require('../../../fixtures/customer.json')
describe('Customer Transactions', () => {
    const user = customer[0];

    beforeEach(() => {
        cy.loginCustomer(user)
        cy.get('button[ng-click="deposit()"]').click()
    })

    it('verifies deposit page elements', () => {
        cy.get('form[ng-submit="deposit()"]').should('be.visible')
        cy.get('form[ng-submit="deposit()"] > div > label')
            .should('be.visible').and('have.text', 'Amount to be Deposited :')
        cy.get('input[ng-model="amount"]').should('be.visible')
        cy.get('form[ng-submit="deposit()"] > button')
            .should('be.visible').and('have.text', 'Deposit')
    });

    
});