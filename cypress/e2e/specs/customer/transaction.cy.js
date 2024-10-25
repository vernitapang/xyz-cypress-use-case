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

    it('verifies table headers', () => {
        cy.get('thead > tr > :nth-child(1)').should('be.visible').and('include.text', 'Date-Time')
        cy.get('thead > tr > :nth-child(2)').should('be.visible').and('include.text', 'Amount')
        cy.get('thead > tr > :nth-child(3)').should('be.visible').and('include.text', 'Transaction Type')
    });

    it('verifies correct date & time format', () => {
        cy.get('table > tbody > #anchor0 > :nth-child(1)').should('be.visible')
            .invoke('text').should('match', /^[A-Z][a-z]{2} \d{1,2}, \d{4} \d{1,2}:\d{2}:\d{2} [AP]M$/)
    });
});