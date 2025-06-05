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

    it('verifies i can delete a user', () => {
        const customerToDelete = customer[2];
        const [fName, lName] = customerToDelete.split(" ");
        cy.get(`tbody > tr:nth-child(3) > td:nth-child(5) > button`).click()
        cy.get(`tbody > tr:nth-child(3) > td:nth-child(1)`).should('not.have.text', fName)
        cy.get(`tbody > tr:nth-child(3) > td:nth-child(2)`).should('not.have.text', lName)
    });

    
    it('verifies can search for a customer by first name', () => {
        const searchCriteria = 'Hermoine';
        cy.get('input[ng-model="searchCustomer"]').type(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(1)').should('have.text', searchCriteria)
    });

    it('verifies can search for a customer by last name', () => {
        const searchCriteria = 'Granger';
        cy.get('input[ng-model="searchCustomer"]').type(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(2)').should('have.text', searchCriteria)
    });

    it('verifies search works case insensitive', () => {
        const searchCriteria = 'HERMOINE';
        cy.get('input[ng-model="searchCustomer"]').type(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(1)').should('have.text', 'Hermoine')
    });

    it('verifies can search for a customer by post code', () => {
        const searchCriteria = 'E859AB';
        cy.get('input[ng-model="searchCustomer"]').type(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(3)').should('have.text', searchCriteria)
    });

    it('verifies can search for a customer by account number', () => {
        const searchCriteria = '1003';
        cy.get('input[ng-model="searchCustomer"]').type(searchCriteria)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').should('include.text', searchCriteria)
    });

    it('verifies can delete a customer', () => {
        const customerToDelete = customer[2];
        const [fName, lName] = customerToDelete.split(" ");
        cy.get(`tbody > tr:nth-child(3) > td:nth-child(5) > button`).click()
        cy.get(`tbody > tr:nth-child(3) > td:nth-child(1)`).should('not.have.text', fName)
        cy.get(`tbody > tr:nth-child(3) > td:nth-child(2)`).should('not.have.text', lName)
    });
});