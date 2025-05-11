const customer = require('../../../fixtures/currentUser.json');
const deposit = require('../../page-action/deposit')
const dashboard = require('../../page-action/dashboard')
describe('Customer Transactions', () => {
    const user = customer[0];

    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('CurrentUser', JSON.stringify(user));
        });
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account')
        dashboard.clickDeposit()
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

    it('verifies amount field is required', () => {
        cy.get('input[ng-model="amount"]').clear()
        deposit.clickDeposit()
        cy.get('input[ng-model="amount"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
    });

    it('verifies can only accept numeric characters', () => {
        deposit.inputAmount('500abc!@#')
        cy.get('input[ng-model="amount"]').should('have.value', '500')
    });

    it("verifies can't deposit an amount with decimal value", () => {
        deposit.inputAmount('500.20')
        deposit.clickDeposit()
        cy.get('input[ng-model="amount"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please enter a valid value. The two nearest valid values are 500 and 501.');
        });
    });

    it("verifies can't deposit negative amount", () => {
        deposit.inputAmount('-500')
        deposit.clickDeposit()
        cy.get('input[ng-model="amount"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please enter a valid value. Amount must be a positive number');
        });
    });
});