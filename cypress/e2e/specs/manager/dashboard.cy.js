const managerActions = require('../../page-action/manager-actions')

describe('Manager Dashboard', () => {
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

    it('verifies manager dashboard have a home button', () => {
        cy.get('button[ng-click="home()"]').should('be.visible').should('include.text', 'Home')
    });

    it('verifies add customer page elements', () => {
        managerActions.clickAddCustomer()
        cy.get('input[ng-model="fName"]').prev().should('be.visible').and('have.text', 'First Name :')
        cy.get('input[ng-model="fName"]').should('be.visible').should('have.attr', 'placeholder', 'First Name')
        cy.get('input[ng-model="lName"]').prev().should('be.visible').and('have.text', 'Last Name :')
        cy.get('input[ng-model="lName"]').should('be.visible').should('have.attr', 'placeholder', 'Last Name')
        cy.get('input[ng-model="postCd"]').prev().should('be.visible').and('have.text', 'Post Code :')
        cy.get('input[ng-model="postCd"]').should('be.visible').should('have.attr', 'placeholder', 'Post Code')
        cy.get('button[type="submit"]').should('be.visible').should('have.text', 'Add Customer')
    });

    it('verifies open account page elements', () => {
        managerActions.clickOpenAccount()
        cy.get('select[ng-model="custId"]').prev().should('be.visible').and('have.text', 'Customer :')
        cy.get('select[ng-model="custId"]').should('be.visible')
        cy.get('select[ng-model="currency"]').prev().should('be.visible').and('have.text', 'Currency :')
        cy.get('select[ng-model="currency"]').should('be.visible')
        cy.get('button[type="submit"]').should('be.visible').should('have.text', 'Process')
    });
});