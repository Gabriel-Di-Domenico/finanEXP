import { TransactionRequests } from './../../mocks/requests/transactionRequests';
import { CustomerRequests } from './../../mocks/requests/customerRequests';
import { VisitDashBoardMock } from '../../mocks/visitDashboardMock';
import { UserActions } from 'cypress/support/user-actions/userActions';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';

describe('Values Validation', () => {
  it('Actual balance validation', () => {
    const visitDashBoardMock = new VisitDashBoardMock();
    const getCustomers = CustomerRequests.getCustomers();

    getCustomers.response.body.content[0].actualBalance = 1500;
    getCustomers.response.body.content[1].actualBalance = 1700;

    visitDashBoardMock.getCustomers = getCustomers;

    UserActions.visitDashboard(visitDashBoardMock);

    cy.get('fin-card[subtitle="Saldo atual"] mat-card-content').contains('R$ 1.013.799,00');
  });
  it('Revenues validation', () => {
    const visitDashBoardMock = new VisitDashBoardMock();
    const getTransactions = TransactionRequests.getTransactions();

    getTransactions.response.body.content[0].transactionType = TransactionType.revenue;
    getTransactions.response.body.content[1].transactionType = TransactionType.revenue;

    getTransactions.response.body.content[0].value = 9999;
    getTransactions.response.body.content[1].value = 9;

    visitDashBoardMock.getTransactions = getTransactions;

    UserActions.visitDashboard(visitDashBoardMock);

    cy.get('fin-card[subtitle="Receitas"] mat-card-content').contains('R$ 10.608,00');
  });
  it('Expenses validation', () => {
    const visitDashBoardMock = new VisitDashBoardMock();
    const getTransactions = TransactionRequests.getTransactions();

    getTransactions.response.body.content[0].value = 12.5;
    getTransactions.response.body.content[1].value = 10;

    visitDashBoardMock.getTransactions = getTransactions;

    UserActions.visitDashboard(visitDashBoardMock);

    cy.get('fin-card[subtitle="Despesas"] mat-card-content').contains('R$ 22,50');
  });
});
