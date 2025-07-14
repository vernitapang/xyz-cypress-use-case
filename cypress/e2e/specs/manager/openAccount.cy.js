const managerActions = require('../../page-action/manager-actions')
const customerDashboard = require('../../page-action/dashboard')

describe('Add Customer', () => {
    beforeEach(() => {
        cy.loginManager()
        managerActions.clickOpenAccount()
    });

    it('verifies customer can open an account', () => {
        managerActions.openAccount('Hermoine Granger', 'Dollar')
        cy.on('window:alert', (alert) => {
            expect(alert).to.eq('Account created successfully with account Number :1016')
        });
    });

    it('verifies account opening is reflected in customer table', () => {
        managerActions.openAccount('Hermoine Granger', 'Dollar')
        managerActions.clickShowCustomer()
        cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').should('include.text', '1016')
    });

    it('verifies account opening is reflected in customer profile', () => {
        managerActions.openAccount('Hermoine Granger', 'Dollar')
        cy.get('.home').click()
        cy.loginCustomer('Hermoine Granger')
        customerDashboard.selectAccount('1016')
        customerDashboard.verifyAccountNumber('1016')
        customerDashboard.verifyCurrency('Dollar')
    });
    
    it('verifies empty form cannot be submitted', () => {
        cy.get('button[type="submit"]').click()
        cy.get('#userSelect').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please select an item in the list.');
        });
        cy.get('#currency').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please select an item in the list.');
        });
    });
});