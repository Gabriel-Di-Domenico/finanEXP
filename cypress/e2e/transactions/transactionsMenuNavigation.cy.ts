import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { VisitTransactionsMock } from 'cypress/mocks/VisitTransactionsMock';
import { UserActions } from 'cypress/support/user-actions/user-actions';

describe('Transactions menu navigation', () => {
  it('Revenues navigation', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    UserActions.visitTransactions(visitTransactionsMock);
    cy.requestStub(TransactionRequests.getRevenues()).as('getRevenues');
    const aliases = ['getRevenues', 'getCustomers', 'getCategories'];

    cy.navigateTo('Receitas');

    aliases.forEach((alias: string) => {
      cy.wait(`@${alias}`);
    });
    cy.url().should('be.equal', 'http://localhost:4200/home/transactions/revenues');
    cy.get('transactions-list table tbody tr').should('have.length', '2');
  });

  it('Expenses validation', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    UserActions.visitTransactions(visitTransactionsMock);

    cy.requestStub(TransactionRequests.getExpenses()).as('getExpenses');

    const aliases = ['getExpenses', 'getCustomers', 'getCategories'];

    cy.navigateTo('Despesas');

    aliases.forEach((alias: string) => {
      cy.wait(`@${alias}`);
    });
    cy.url().should('be.equal', 'http://localhost:4200/home/transactions/expenses');
    cy.get('transactions-list table tbody tr').should('have.length', '2');
  });

  it('Transfers validation', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    UserActions.visitTransactions(visitTransactionsMock);

    cy.requestStub(TransactionRequests.getTransfers()).as('getTransfers');

    const aliases = ['getTransfers', 'getCustomers'];

    cy.navigateTo('Transferências');

    aliases.forEach((alias: string) => {
      cy.wait(`@${alias}`);
    });
    cy.url().should('be.equal', 'http://localhost:4200/home/transactions/transfers');
    cy.get('transactions-list table tbody tr').should('have.length', '2');
  });
});
