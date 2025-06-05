const managerActions = require('../../page-action/manager-actions')

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

    it('verifies account opening is reflected in customer dashboard', () => {
        managerActions.openAccount('Hermoine Granger', 'Dollar')
        managerActions.clickShowCustomer()
        cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').should('include.text', '1016')
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