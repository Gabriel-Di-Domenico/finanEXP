import { VisitTransactionsMock } from '../../mocks/visitTransactionsMock';
import { TestUtils } from '../test.utils';
import { VisitDashBoardMock } from '../../mocks/visitDashboardMock';
import { CategoriesRequests } from 'cypress/mocks/requests/categoriesRequests';
import { CustomerRequests } from 'cypress/mocks/requests/customerRequests';
import { VisitCategoriesMock } from 'cypress/mocks/visitCategoriesMock';

export class UserActions {
  public static visitAuthenticate() {
    cy.visit('/auth');
  }
  public static visitDashboard(visitDashBoardMock: VisitDashBoardMock) {
    const requests = TestUtils.getRequestsFromMock(visitDashBoardMock);
    const aliases = TestUtils.batchRequestStub(requests);

    cy.visit('/home/dashboard');

    cy.batchWait(aliases)
  }
  public static visitTransactions(visitTransactionsMock: VisitTransactionsMock) {
    const requests = TestUtils.getRequestsFromMock(visitTransactionsMock);
    const aliases = TestUtils.batchRequestStub(requests);

    cy.visit('/home/transactions');

    cy.batchWait(aliases)

    return aliases;
  }
  public static visitCreateTransaction(transactionType: 'Receita' | 'Despesa' | 'Transferência') {
    const visitTransactionsMock = new VisitTransactionsMock();
    this.visitTransactions(visitTransactionsMock);

    cy.get('app-menu fin-icon-button[icon="add"] button').click();

    const aliases = TestUtils.batchRequestStub([CustomerRequests.getCustomersV2(), CategoriesRequests.getCategoriesV2()]);
    if(transactionType === 'Transferência'){
      aliases.splice(1)
    }
    cy.get('transaction-menu button').contains(transactionType).click();

    cy.batchWait(aliases);
  }
  public static visitCategories(visitCategoriesMock:VisitCategoriesMock) {
    const requests = TestUtils.getRequestsFromMock(visitCategoriesMock);
    const aliases = TestUtils.batchRequestStub(requests);

    cy.visit('/home/categories');

    cy.batchWait(aliases)
  }
}
