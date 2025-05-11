const customer = require('../../../fixtures/customer.json')
describe('Transactions Page', () => {
    const user = customer[0];

    beforeEach(() => {
        cy.loginCustomer(user)
        cy.get('button[ng-click="transactions()"]').click()
    })

    it('verifies correct date & time format', () => {
        cy.get('table > tbody > #anchor0 > :nth-child(1)').should('be.visible')
            .invoke('text').should('match', /^[A-Z][a-z]{2} \d{1,2}, \d{4} \d{1,2}:\d{2}:\d{2} [AP]M$/)
    });
});