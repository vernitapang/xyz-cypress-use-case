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

    addCustomer(fName, lName, postCd) {
        cy.get('input[ng-model="fName"]').type(fName)
        cy.get('input[ng-model="lName"]').type(lName)
        cy.get('input[ng-model="postCd"]').type(postCd)
        cy.get('button[type="submit"]').click()
    }

    openAccount(custId, currency) {
        cy.get('select[ng-model="custId"]').select(custId)
        cy.get('select[ng-model="currency"]').select(currency)
        cy.get('button[type="submit"]').click()
    }

    searchCustomer(searchCriteria) {
        cy.get('input[ng-model="searchCustomer"]').type(searchCriteria)
    }
}

module.exports = new ManagerActions();