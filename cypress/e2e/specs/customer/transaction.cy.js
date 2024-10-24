const customer = require('../../../fixtures/customer.json')
describe('Customer Transactions', () => {
    const user = customer[0];

    beforeEach(() => {
        cy.loginCustomer(user)
        cy.get('button[ng-click="transactions()"]').click()
    })

    it('verifies customer transactions page url', () => {
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/listTx')
    });

    it('verifies customer transactions page elements', () => {
        cy.get('button[ng-click="back()"]').should('be.visible', 'have.text', 'Back')
        cy.get('button[ng-click="reset()"]').should('be.visible', 'have.text', 'Reset')

        cy.get('input[id="start"]').should('be.visible')
        cy.get('input[id="end"]').should('be.visible')

        cy.get('.table').should('be.visible')

        cy.get('button[ng-click="scrollRight()"]').should('be.visible')
    });
});