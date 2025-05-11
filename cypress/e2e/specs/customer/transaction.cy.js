const customer = require('../../../fixtures/customer.json')
const dashboard = require('../../page-action/dashboard')
const deposit = require('../../page-action/deposit')
const transaction = require('../../page-action/transaction')

describe('Transactions Page', () => {
    const user = customer[0];

    beforeEach(() => {
        cy.loginCustomer(user)
        dashboard.clickTransaction()
    })

    it('verifies correct date & time format', () => {
        cy.get('table > tbody > #anchor0 > :nth-child(1)').should('be.visible')
            .invoke('text').should('match', /^[A-Z][a-z]{2} \d{1,2}, \d{4} \d{1,2}:\d{2}:\d{2} [AP]M$/)
    });

    it('verifies deposit transaction is reflected in transaction history', () => {
        transaction.clickReset()
        transaction.clickBack()
        dashboard.clickDeposit()
        deposit.inputAmount('500')
        deposit.clickDeposit()
        deposit.verifySuccessful()
        cy.wait(1000)
        dashboard.clickTransaction()
        
        cy.get('table > tbody > #anchor0 > :nth-child(2)').should('have.text', "500")
        cy.get('table > tbody > #anchor0 > :nth-child(3)').should('have.text', "Credit")
    });
});