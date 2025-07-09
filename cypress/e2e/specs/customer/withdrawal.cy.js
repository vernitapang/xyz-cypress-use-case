const customer = require('../../../fixtures/currentUser.json');
const withdraw = require('../../page-action/withdrawal')
const dashboard = require('../../page-action/dashboard')
describe('Withdrawal Transactions', () => {
    const user = customer[0];

    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('CurrentUser', JSON.stringify(user));
        });
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account')
        dashboard.clickWithdrawal()
    })

    it('verifies withdrawal page elements', () => {
        cy.get('form[ng-submit="withdrawl()"]').should('be.visible')
        cy.get('form[ng-submit="withdrawl()"] > div > label')
            .should('be.visible').and('have.text', 'Amount to be Withdrawn :')
        cy.get('input[ng-model="amount"]').should('be.visible')
        cy.get('input[ng-model="amount"]').should('have.attr', 'placeholder', 'amount')
        cy.get('form[ng-submit="withdrawl()"] > button')
            .should('be.visible').and('have.text', 'Withdraw')
    });

    it('verifies can withdraw a whole amount', () => {
        let withdrawAmount = 2000
        dashboard.getBalance().then((initialBalance) => {
            withdraw.inputAmount(withdrawAmount)
            withdraw.clickWithdraw()

            cy.get('span[ng-show="message"]')
                .should('be.visible').and('have.text', 'Transaction successful')
            cy.get('.borderM > :nth-child(3) > :nth-child(2)')
                .should('have.text', initialBalance - withdrawAmount)
        })
    });

    it('verifies that the amount field are clickable and editable', () => {
        cy.get('input[ng-model="amount"]').should('be.visible').click()
            .should('have.focus').type('12345').should('have.value', '12345')
    });

    it('verifies amount field is required', () => {
        cy.get('input[ng-model="amount"]').clear()
        withdraw.clickWithdraw()
        cy.get('input[ng-model="amount"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
    });

    it('verifies can only accept numeric characters', () => {
        withdraw.inputAmount('500abc!@#')
        cy.get('input[ng-model="amount"]').should('have.value', '500')
    });

    it("verifies can't withdraw an amount with decimal value", () => {
        withdraw.inputAmount('500.20')
        withdraw.clickWithdraw()
        cy.get('input[ng-model="amount"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please enter a valid value. The two nearest valid values are 500 and 501.');
        });
    });

    it("verifies can't withdraw negative amount", () => {
        withdraw.inputAmount('-500')
        withdraw.clickWithdraw()
        cy.get('input[ng-model="amount"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please enter a valid value. Amount must be a positive number');
        });
    });

    it("verifies can't withdraw more than balance", () => {
        withdraw.inputAmount('50000')
        withdraw.clickWithdraw()
        cy.get('.error').should('be.visible').and('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.')
    });
});