import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { VisitTransactionsMock } from 'cypress/mocks/VisitTransactionsMock';

import { UserActions } from 'cypress/support/user-actions/user-actions';

describe('Transactions Values Validation', () => {
  it('Actual balance validation', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    UserActions.visitTransactions(visitTransactionsMock);

    cy.get('fin-card[subtitle="Saldo atual"] mat-card-content').contains('R$ 1.010.650,00');
  });
  it('Revenues validation', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    const getTransactions = TransactionRequests.getTransactions();

    visitTransactionsMock.getTransactions = getTransactions;

    UserActions.visitTransactions(visitTransactionsMock);

    cy.get('fin-card[subtitle="Receitas"] mat-card-content').contains('R$ 600,00');
  });
  it('Expenses validation', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    const getTransactions = TransactionRequests.getTransactions();

    getTransactions.response.body.content[0].value = 12.5;
    getTransactions.response.body.content[1].value = 10;

    visitTransactionsMock.getTransactions = getTransactions;

    UserActions.visitTransactions(visitTransactionsMock);

    cy.get('fin-card[subtitle="Despesas"] mat-card-content').contains('R$ 22,50');
  });
});
