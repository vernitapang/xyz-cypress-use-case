const managerActions = require('../../page-action/manager-actions')
const customer = require('../../../fixtures/customer.json');

describe('Manage Customer', () => {
    beforeEach(() => {
        cy.loginManager()
        managerActions.clickShowCustomer()
    });

    it('verifies manage customer page elements', () => {
        cy.get('input[ng-model="searchCustomer"]').should('be.visible').should('have.attr', 'placeholder', 'Search Customer')
        cy.get('table').should('be.visible')
    });

    it('verifies customer table headers', () => {
        cy.get('thead > tr > :nth-child(1)').should('be.visible').and('include.text', 'First Name')
        cy.get('thead > tr > :nth-child(2)').should('be.visible').and('include.text', 'Last Name')
        cy.get('thead > tr > :nth-child(3)').should('be.visible').and('include.text', 'Post Code')
        cy.get('thead > tr > :nth-child(4)').should('be.visible').and('include.text', 'Account Number')
        cy.get('thead > tr > :nth-child(5)').should('be.visible').and('include.text', 'Delete Customer')
    });

    it('verifies default customer must be listed', () => {
        customer.forEach((user, index) => {
            const [fName, lName] = user.split(" ");
            cy.get(`tbody > tr:nth-child(${index+1}) > td:nth-child(1)`).should('have.text', fName)
            cy.get(`tbody > tr:nth-child(${index+1}) > td:nth-child(2)`).should('have.text', lName)
        })
    });

    it('verifies can delete a customer', () => {
        const customerToDelete = customer[2];
        const [fName, lName] = customerToDelete.split(" ");
        managerActions.searchCustomer(fName)
        cy.get(`tbody > tr:nth-child(1) > td:nth-child(5) > button`).contains('Delete').click()
        cy.get('input[ng-model="searchCustomer"]').clear()
        cy.get('tbody').should('not.have.text', fName)
        cy.get('tbody').should('not.have.text', lName)
    });

    it('verifies deleted customer should not reflect in customer login', () => {
        const customer3 = customer[3];
        const fName = customer3.split(" ")[0];
        managerActions.searchCustomer(fName)
        cy.get(`tbody > tr:nth-child(1) > td:nth-child(5) > button`).contains('Delete').click()
        cy.get('.home').click()
        cy.get(`[ng-click="customer()"]`).click()
        cy.get('select').should('not.contain', customer3);
    });
    
    it('verifies can search for a customer by first name', () => {
        const searchCriteria = 'Hermoine';
        managerActions.searchCustomer(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(1)').should('have.text', searchCriteria)
    });

    it('verifies can search for a customer by last name', () => {
        const searchCriteria = 'Granger';
        managerActions.searchCustomer(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(2)').should('have.text', searchCriteria)
    });

    it('verifies search works case insensitive', () => {
        const searchCriteria = 'HERMOINE';
        managerActions.searchCustomer(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(1)').should('have.text', 'Hermoine')
    });

    it('verifies can search for a customer by post code', () => {
        const searchCriteria = 'E859AB';
        managerActions.searchCustomer(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(3)').should('have.text', searchCriteria)
    });

    it('verifies can search for a customer by account number', () => {
        const searchCriteria = '1003';
        managerActions.searchCustomer(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').should('include.text', searchCriteria)
    });
});