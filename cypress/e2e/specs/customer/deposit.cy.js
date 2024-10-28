const customer = require('../../../fixtures/customer.json')
const Deposit = require('../../page-action/deposit')
describe('Customer Transactions', () => {
    const user = customer[0];
    const deposit = new Deposit()

    beforeEach(() => {
        cy.loginCustomer(user)
        cy.get('button[ng-click="deposit()"]').click()
    })

    it('verifies deposit page elements', () => {
        cy.get('form[ng-submit="deposit()"]').should('be.visible')
        cy.get('form[ng-submit="deposit()"] > div > label')
            .should('be.visible').and('have.text', 'Amount to be Deposited :')
        cy.get('input[ng-model="amount"]').should('be.visible')
        cy.get('input[ng-model="amount"]').should('have.attr', 'placeholder', 'amount')
        cy.get('form[ng-submit="deposit()"] > button')
            .should('be.visible').and('have.text', 'Deposit')
    });

    it('verifies can deposit a whole amount', () => {
        let depositAmount = 2000
        deposit.getBalance().then((initialBalance) => {
            deposit.inputAmount(depositAmount)
            deposit.clickDeposit()

            cy.get('span[ng-show="message"]')
                .should('be.visible').and('have.text', 'Deposit Successful')
            cy.get('.borderM > :nth-child(3) > :nth-child(2)')
                .should('have.text', initialBalance + depositAmount)
        })
    });

    it('verifies that the amount field are clickable and editable', () => {
        cy.get('input[ng-model="amount"]').should('be.visible').click()
            .should('have.focus').type('12345').should('have.value', '12345')
    });

    it.skip('verifies amount field is not empty', () => {
        TODO: this
    });

    it.skip('verifies can only accept numeric characters', () => {
        TODO: this
    });

    it.skip("verifies can't deposit an amount with decimal value", () => {
        TODO: this
    });

    it.skip("verifies amount field can't accept letters & special characters", () => {
        TODO: this
    });
});