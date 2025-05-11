const customer = require('../../../fixtures/customer.json')
const dashboard = require('../../page-action/dashboard')
const deposit = require('../../page-action/deposit')
const withdraw = require('../../page-action/withdrawal')

describe('Customer Transactions', () => {
    const user = customer[1];

    beforeEach(() => {
        cy.loginCustomer(user)
        dashboard.clickDeposit()
        deposit.inputAmount('500')
        deposit.clickDeposit()
        dashboard.clickWithdrawal()
        cy.wait(500)
        withdraw.inputAmount('500')
        withdraw.clickWithdraw()
        withdraw.verifySuccessful()
        cy.wait(1000)
        dashboard.clickTransaction()
    })

    it('verifies correct date & time format', () => {
        cy.get('table > tbody > #anchor0 > :nth-child(1)').should('be.visible')
            .invoke('text').should('match', /^[A-Z][a-z]{2} \d{1,2}, \d{4} \d{1,2}:\d{2}:\d{2} [AP]M$/)
    });

    it('verifies deposit transaction is reflected in transaction history', () => {
        cy.get('table > tbody > #anchor0 > :nth-child(2)').should('have.text', "500")
        cy.get('table > tbody > #anchor0 > :nth-child(3)').should('have.text', "Credit")
    });

    it('verifies withdrawal transaction is reflected in transaction history', () => {   
        cy.get('table > tbody > #anchor1 > :nth-child(2)').should('have.text', "500")
        cy.get('table > tbody > #anchor1 > :nth-child(3)').should('have.text', "Debit")
    });
});