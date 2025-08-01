const customer = require('../../../fixtures/currentUser.json');
const dashboard = require('../../page-action/dashboard')

describe('Customer Dashboard', () => {
    const user = customer[1];

    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('CurrentUser', JSON.stringify(user));
        });
        cy.visit('account')
    });

    it('verifies customer dashboard url', () => {
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account')
    });

    it('verifies customer dashboard page elements', () => {
        cy.get('.mainHeading').should('be.visible').and('have.text', 'XYZ Bank')
        cy.get('.home').should('be.visible').and('have.text', 'Home')
        cy.get('.logout').should('be.visible').and('have.text', 'Logout')

        cy.get('.borderM > :nth-child(1) > strong')
            .should('be.visible', 'have.text', `Welcome ${user.fName} ${user.lName} !!`)

        cy.get('#accountSelect').should('be.visible');
        cy.get('.borderM > :nth-child(3)').should('be.visible')
            .and('include.text', 'Account Number')
            .and('include.text', 'Balance')
            .and('include.text', 'Currency');
    });

    it('verifies CTA button for Transactions', () => {
        cy.get('button[ng-click="transactions()"]').should('be.visible').should('include.text', 'Transactions')
    });

    it('verifies CTA button for Deposit', () => {
        cy.get('button[ng-click="deposit()"]').should('be.visible').should('include.text', 'Deposit')
    });

    it('verifies CTA button for Withdrawal', () => {
        cy.get('button[ng-click="withdrawl()"]').should('be.visible').should('include.text', 'Withdrawal')
    });

    it('switches to different account', () => {
        dashboard.selectAccount('1005')
        dashboard.verifyAccountNumber('1005')
    });

    it('switches account with different currency', () => {
        dashboard.selectAccount('1006')
        dashboard.verifyCurrency('Rupee')
    });

    it('verifies logout button', () => {
        cy.get('.logout').click()
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer')
    });
});