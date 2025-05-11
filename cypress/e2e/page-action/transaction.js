class Transaction {
    clickTransaction() {
        cy.get('button[ng-click="transactions()"]').click()
    }

    clickReset() {
        cy.get('button[ng-click="reset()"]').click()
    }

    clickBack() {
        cy.get('button[ng-click="back()"]').click()
    }
}

module.exports = new Transaction();