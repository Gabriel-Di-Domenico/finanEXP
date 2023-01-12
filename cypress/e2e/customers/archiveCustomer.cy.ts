import { CustomerRequests } from 'cypress/mocks/requests/customerRequests';
import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { VisitCustomersMock } from 'cypress/mocks/visitCustomersMock';
import { TestUtils } from 'cypress/support/test.utils';
import { UserActions } from 'cypress/support/user-actions/userActions';
import { Interception } from 'cypress/types/net-stubbing';

describe('Archive customer', () => {
  it('Archive customer with successfully', () => {
    const visitCustomersMock = new VisitCustomersMock();
    UserActions.visitCustomers(visitCustomersMock);

    const aliases = TestUtils.batchRequestStub([CustomerRequests.getCustomerById(), TransactionRequests.getTransactions()]);
    cy.get('fin-customer-card').eq(0).click();

    cy.batchWait(aliases);

    cy.get('fin-icon-button[icon=archive] button').click();

    TestUtils.batchRequestStub([CustomerRequests.putCustomer(), CustomerRequests.getCustomersV2()])

    cy.get('mat-dialog-container fin-button').contains('Sim').click();

    cy.wait(`@${CustomerRequests.putCustomer().alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(CustomerRequests.putCustomer().response.statusCode);
      expect(interception.request?.body).contains(CustomerRequests.putCustomer().expectedBody);
    })
    cy.wait(`@${CustomerRequests.getCustomersV2().alias}`)
  });
  it('Unarchive customer with successfully', () => {
    const visitCustomersMock = new VisitCustomersMock();
    UserActions.visitCustomers(visitCustomersMock);

    cy.get('fin-icon-button[icon=more_vert] button').click();

    cy.get('more-customers-options button').eq(0).click();

    cy.url().should('be.equal', 'http://localhost:4200/home/customers/archived')

    const getCustomerById = CustomerRequests.getCustomerById()
    getCustomerById.response.body.content.isArchived = true;
    const aliases = TestUtils.batchRequestStub([getCustomerById, TransactionRequests.getTransactions()]);
    cy.get('fin-customer-card').eq(0).click();

    cy.batchWait(aliases);

    cy.get('fin-icon-button[icon=unarchive] button').click();

    TestUtils.batchRequestStub([CustomerRequests.putCustomer(), CustomerRequests.getCustomersV2()])

    cy.get('mat-dialog-container fin-button').contains('Sim').click();

    cy.wait(`@${CustomerRequests.putCustomer().alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(CustomerRequests.putCustomer().response.statusCode);
      expect(interception.request?.body).contains(CustomerRequests.putCustomer().expectedBody);
    })
    cy.wait(`@${CustomerRequests.getCustomersV2().alias}`)
  })
});