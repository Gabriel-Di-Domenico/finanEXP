import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { VisitTransactionsMock } from '../../mocks/visitTransactionsMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Delete transaction', () => {
  it('Delete transaction with successfully', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    UserActions.visitTransactions(visitTransactionsMock);

    cy.get('fin-icon-button[icon=delete] button').eq(0).click();

    cy.requestStub(TransactionRequests.deleteTransaction()).as('deleteTransaction')
    cy.get('fin-button').contains('Sim').click()
    cy.wait('@deleteTransaction')
  });
});
