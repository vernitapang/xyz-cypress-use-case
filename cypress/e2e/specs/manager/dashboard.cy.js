

describe('Customer Dashboard', () => {
    beforeEach(() => {
        cy.loginManager()
    });

    it('verifies manager dashboard url', () => {
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager')
    });

    it('verifies CTA buttons for bank manager', () => {
        cy.get('button[ng-click="addCust()"]').should('be.visible').should('include.text', 'Add Customer')
        cy.get('button[ng-click="openAccount()"]').should('be.visible').should('include.text', 'Open Account')
        cy.get('button[ng-click="showCust()"]').should('be.visible').should('include.text', 'Customers')
    });
});