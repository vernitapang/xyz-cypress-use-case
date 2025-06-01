class ManagerActions {

    clickAddCustomer() {
        cy.get('button[ng-click="addCust()"]').click()
    }

    clickOpenAccount() {
        cy.get('button[ng-click="openAccount()"]').click()
    }
    
    clickShowCustomer() {
        cy.get('button[ng-click="showCust()"]').click()
    }
}

module.exports = new ManagerActions();