
import { VisitDashBoardMock } from 'cypress/mocks/visitDashboardMock';
import { UserActions } from 'cypress/support/user-actions/user-actions';
describe('Navigation Validation', () => {
  const visitDashBoardMock = new VisitDashBoardMock();
  it('Actual balance navigation', () => {
    UserActions.visitDashboard(visitDashBoardMock);
    cy.get('fin-card[subtitle="Saldo atual"]').click();
    cy.url().should('be.equal', 'http://localhost:4200/home/customers');
  });
  it('Revenues navigation', () => {
    UserActions.visitDashboard(visitDashBoardMock);
    cy.get('fin-card[subtitle="Receitas"]').click();
    cy.url().should('be.equal', 'http://localhost:4200/home/transactions/revenues');
  });
  it('Expenses navigation', () => {
    UserActions.visitDashboard(visitDashBoardMock);
    cy.get('fin-card[subtitle="Despesas"]').click();
    cy.url().should('be.equal', 'http://localhost:4200/home/transactions/expenses');
  });
});
