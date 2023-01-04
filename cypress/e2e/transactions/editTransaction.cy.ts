import { Interception } from 'cypress/types/net-stubbing';
import { CategoriesRequests } from './../../mocks/requests/categoriesRequests';
import { CustomerRequests } from './../../mocks/requests/customerRequests';
import { TestUtils } from 'cypress/support/test.utils';
import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { VisitTransactionsMock } from 'cypress/mocks/VisitTransactionsMock';
import { UserActions } from 'cypress/support/user-actions/user-actions';

describe('Edit transactions', () => {
  it('Edit transaction with successfully', () => {
    const visitTransactionsMock = new VisitTransactionsMock();
    UserActions.visitTransactions(visitTransactionsMock);

    const aliases = TestUtils.batchRequestStub([
      TransactionRequests.getTransactionById(),
      CustomerRequests.getCustomersV2(),
      CategoriesRequests.getCategoriesV2(),
    ]);

    cy.get('fin-icon-button[icon=edit] button').eq(0).click();
    cy.get('fin-transactions-editor-dialog').should('not.be.null');

    aliases.forEach((alias: string) => {
      cy.wait(`@${alias}`);
    });

    cy.get('fin-input-currency').clear().type('15,00')

    cy.getInput('description').clear().type(TestUtils.mockStrings[1])

    cy.get('fin-date-picker input').clear().type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click()

    cy.get('div[role="listbox"] mat-option').eq(1).click()

    cy.get('fin-select[ng-reflect-name="categoryId"]').click()

    cy.get('div[role="listbox"] mat-option').eq(1).click()

    cy.requestStub(TransactionRequests.putTransaction()).as('putTransaction')
    cy.getSubmitButton('form').click()
    cy.wait('@putTransaction').then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(TransactionRequests.putTransaction().response.statusCode)
      expect(interception.request?.body).contains(TransactionRequests.putTransaction().expectedBody)
    })
  });
});
