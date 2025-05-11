class Dashboard {
    clickTransaction() {
        cy.get('button[ng-click="transactions()"]').click()
    }

    clickDeposit() {
        cy.get('button[ng-click="deposit()"]').click()
    }

    clickWithdrawal() {
        cy.get('button[ng-click="withdrawl()"]').click()
    }
}

module.exports = new Dashboard();