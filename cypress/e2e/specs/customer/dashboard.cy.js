const customer = require('../../../fixtures/customer.json')
describe('Customer Dashboard', () => {
    const user = customer[1];

    beforeEach(() => {
        cy.loginCustomer(user)
    })

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

        cy.get('[ng-class="btnClass1"]').should('be.visible', 'have.text', 'Transactions')
        cy.get('[ng-class="btnClass2"]').should('be.visible', 'have.text', 'Deposit')
        cy.get('[ng-class="btnClass3"]').should('be.visible', 'have.text', 'Withdrawl')
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