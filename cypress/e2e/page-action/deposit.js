class Deposit {

    inputAmount(amount) {
        cy.get('input[ng-model="amount"]').type(amount)
    }

    clickDeposit() {
        cy.get('form[ng-submit="deposit()"] > button').click()
    }

    verifySuccessful() {
        cy.get('span[ng-show="message"]')
            .should('be.visible').and('have.text', 'Deposit Successful')
    }
}

module.exports = new Deposit();