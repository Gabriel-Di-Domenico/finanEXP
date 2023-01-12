import { Interception } from 'cypress/types/net-stubbing';
import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { CustomerRequests } from 'cypress/mocks/requests/customerRequests';
import { TestUtils } from 'cypress/support/test.utils';
import { VisitCustomersMock } from 'cypress/mocks/visitCustomersMock';
import { UserActions } from '../../support/user-actions/userActions';
describe('Archive customer', () => {
  it('Edit customer with successfully', () => {
    const visitCustomersMock = new VisitCustomersMock();
    UserActions.visitCustomers(visitCustomersMock);

    const aliases = TestUtils.batchRequestStub([CustomerRequests.getCustomerById(), TransactionRequests.getTransactions()]);
    cy.get('fin-customer-card').eq(0).click();

    cy.batchWait(aliases);

    cy.get('fin-icon-button[icon=edit] button').click();

    cy.get('fin-input-currency input').clear();
    cy.get('fin-input-currency input').type(TestUtils.mockNumbers[0].toString()).type('0').type('0')

    cy.getInput('name').clear();
    cy.getInput('name').type(TestUtils.mockStrings[0]);

    cy.get('fin-select[ng-reflect-name="type"]').click();
    cy.get('div[role="listbox"] mat-option').eq(0).click();

    TestUtils.batchRequestStub([CustomerRequests.putCustomer(), CustomerRequests.getCustomersV2()])

    cy.getSubmitButton('form').click();

    cy.wait(`@${CustomerRequests.putCustomer().alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(CustomerRequests.putCustomer().response.statusCode);
      expect(interception.request?.body).contains(CustomerRequests.putCustomer().expectedBody);
    })
    cy.wait(`@${CustomerRequests.getCustomersV2().alias}`)
  });
});
