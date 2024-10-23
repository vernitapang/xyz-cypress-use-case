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
});