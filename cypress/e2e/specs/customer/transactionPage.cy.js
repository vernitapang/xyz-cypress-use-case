describe('Transactions Page', () => {

    beforeEach(() => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/listTx')
    })
    
    it('verifies customer transactions page url', () => {
        cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/listTx')
    });

    it('verifies customer transactions page elements', () => {
        cy.get('button[ng-click="back()"]').should('be.visible', 'have.text', 'Back')
        cy.get('button[ng-click="reset()"]').should('be.visible', 'have.text', 'Reset')

        cy.get('input[id="start"]').should('be.visible')
        cy.get('input[id="end"]').should('be.visible')

        cy.get('.table').should('be.visible')

        cy.get('button[ng-click="scrollRight()"]').should('be.visible')
    });

    it('verifies table headers', () => {
        cy.get('thead > tr > :nth-child(1)').should('be.visible').and('include.text', 'Date-Time')
        cy.get('thead > tr > :nth-child(2)').should('be.visible').and('include.text', 'Amount')
        cy.get('thead > tr > :nth-child(3)').should('be.visible').and('include.text', 'Transaction Type')
    });
});