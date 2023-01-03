import { TestUtils } from '../test.utils';
import { VisitDashBoardMock } from '../../mocks/visitDashboardMock';
import { VisitTransactionsMock } from 'cypress/mocks/VisitTransactionsMock';
export class UserActions {
  public static visitAuthenticate() {
    cy.visit('/auth');
  }
  public static visitDashboard(visitDashBoardMock: VisitDashBoardMock) {
    const requests = TestUtils.getRequestsFromMock(visitDashBoardMock);
    const aliases = TestUtils.batchRequestStub(requests);

    cy.visit('/home/dashboard');

    aliases.forEach((alias: string) => {
      cy.wait(`@${alias}`);
    });
  }
  public static visitTransactions(visitTransactionsMock: VisitTransactionsMock) {
    const requests = TestUtils.getRequestsFromMock(visitTransactionsMock);
    const aliases = TestUtils.batchRequestStub(requests);

    cy.visit('/home/transactions');

    aliases.forEach((alias: string) => {
      cy.wait(`@${alias}`);
    });
    return aliases
  }
}
