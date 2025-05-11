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

    getBalance() {
        return cy.get('.borderM > :nth-child(3) > :nth-child(2)')
            .invoke('text')
            .then((text) => {
                const balance = parseFloat(text);
                return balance;
            });
    }
}

module.exports = new Dashboard();