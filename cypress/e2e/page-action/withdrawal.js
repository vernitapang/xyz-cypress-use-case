class Withdraw {

    inputAmount(amount) {
        cy.get('input[ng-model="amount"]').type(amount)
    }

    clickWithdraw() {
        cy.get('form[ng-submit="withdrawl()"] > button').click()
    }

    verifySuccessful() {
        cy.get('span[ng-show="message"]')
            .should('be.visible').and('have.text', 'Transaction successful')
    }
}

module.exports = new Withdraw();