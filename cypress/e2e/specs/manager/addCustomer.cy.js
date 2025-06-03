const managerActions = require('../../page-action/manager-actions')

describe('Add Customer', () => {
    beforeEach(() => {
        cy.loginManager()
        managerActions.clickAddCustomer()
    });

    it('verifies valid customer can be added', () => {
        managerActions.addCustomer('John', 'Doe', 'E89898')

        managerActions.clickShowCustomer()
        cy.get('tbody > tr:nth-child(6) > td:nth-child(1)').should('have.text', 'John')
        cy.get('tbody > tr:nth-child(6) > td:nth-child(2)').should('have.text', 'Doe')
        cy.get('tbody > tr:nth-child(6) > td:nth-child(3)').should('have.text', 'E89898')
    });

    it('verifies added customer can be logged in', () => {
        managerActions.addCustomer('John', 'Doe', 'E89898')
        cy.get('.home').click()
        cy.loginCustomer('John Doe')
        cy.get('.fontBig').should('have.text', 'John Doe')
    });

    it('verifies existing customer cannot be added', () => {
        managerActions.addCustomer('Hermoine', 'Granger', 'E859AB')
        cy.on('window:alert', (alert) => {
            expect(alert).to.eq('Please check the details. Customer may be duplicate.')
        });
    });
    
    it('verifies empty form cannot be submitted', () => {
        cy.get('button[type="submit"]').click()
        cy.get('input[ng-model="fName"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('input[ng-model="lName"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('input[ng-model="postCd"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
    });
});