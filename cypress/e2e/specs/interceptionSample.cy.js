describe('Interception Sample', () => {
    it('mocks the manager view', () => {
        cy.intercept('GET', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/managerView.html', req => {
            return req.reply({
                fixture: 'managerViewMock.html'
            })
        }).as('mockedManagerView')
        cy.loginManager()
        cy.wait('@mockedManagerView')
        cy.get('[ng-class="btnClass4"]').should('be.visible', 'have.text', 'Mocked Button')
    });
});