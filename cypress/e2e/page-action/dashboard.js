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

    inputAmount(amount) {
        cy.get('input[ng-model="amount"]').type(amount)
    }

    getBalance() {
        return cy.get('.borderM > :nth-child(3) > :nth-child(2)')
            .invoke('text')
            .then((text) => {
                const balance = parseFloat(text);
                return balance;
            });
    }

    selectAccount(account) {
        cy.get('#accountSelect').select(`number:${account}`)
    }

    verifyAccountNumber(accountNo) {
        cy.get('.borderM > :nth-child(3) > :nth-child(1)').should('include.text', accountNo)
    }

    verifyCurrency(currency) {
        cy.get('.borderM > :nth-child(3) > :nth-child(3)').should('include.text', currency)
    }
}

module.exports = new Dashboard();