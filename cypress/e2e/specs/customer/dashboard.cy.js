const customer = require('../../../fixtures/customer.json')
describe('Customer Dashboard', () => {
    const user = customer[1];

    beforeEach(() => {
        cy.loginCustomer(user)
    })

    it('verifies customer dashboard url', () => {
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account')
    });

    it('verifies customer dashboard page elements', () => {
        cy.get('.mainHeading').should('be.visible', 'have.text', 'XYZ Bank')
        cy.get('.home').should('be.visible', 'have.text', 'Home')
        cy.get('.logout').should('be.visible', 'have.text', 'Logout')
        
        cy.get('.borderM > :nth-child(1) > strong').should('be.visible', 'have.text', `Welcome ${user} !!`)
        cy.get('#accountSelect').should('be.visible')
        cy.get('.borderM > :nth-child(3)').should('be.visible')
            .and('include.text', 'Account Number')
            .and('include.text', 'Balance')
            .and('include.text', 'Currency')
    });

    it('verifies cta button for Transactions', () => {
        cy.get('button[ng-click="transactions()"]').should('be.visible').should('include.text', 'Transactions')
    });

    it('verifies cta button for Deposit', () => {
        cy.get('button[ng-click="deposit()"]').should('be.visible').should('include.text', 'Deposit')
    });

    it('verifies cta button for Withdrawal', () => {
        cy.get('button[ng-click="withdrawl()"]').should('be.visible').should('include.text', 'Withdrawal')
    });

    it('switches to different account', () => {
        cy.get('#accountSelect').select('number:1005')
        cy.get('.borderM > :nth-child(3) > :nth-child(1)').should('include.text', '1005')
    });

    it('switches account with different currency', () => {
        cy.get('#accountSelect').select('number:1006')
        cy.get('.borderM > :nth-child(3) > :nth-child(3)').should('include.text', 'Rupee')
    });
});