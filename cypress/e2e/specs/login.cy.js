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
        cy.loginCustomer('Hermoine Granger')
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account')
    });

    it('login as bank manager', () => {
        cy.get('[ng-click="manager()"]').click()
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager')
    });

    
});