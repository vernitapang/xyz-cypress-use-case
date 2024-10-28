class Deposit {

    inputAmount(amount) {
        cy.get('input[ng-model="amount"]').type(amount)
    }

    clickDeposit() {
        cy.get('form[ng-submit="deposit()"] > button').click()
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

module.exports = Deposit;