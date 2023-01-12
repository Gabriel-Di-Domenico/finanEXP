import { CustomerRequests } from 'cypress/mocks/requests/customerRequests';
import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { VisitCustomersMock } from 'cypress/mocks/visitCustomersMock';
import { TestUtils } from 'cypress/support/test.utils';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Delete customer with successfully', () => {
  it('Unarchive customer with successfully', () => {
    const visitCustomersMock = new VisitCustomersMock();
    UserActions.visitCustomers(visitCustomersMock);

    cy.get('fin-icon-button[icon=more_vert] button').click();

    cy.get('more-customers-options button').eq(0).click();

    cy.url().should('be.equal', 'http://localhost:4200/home/customers/archived');

    const getCustomerById = CustomerRequests.getCustomerById();
    getCustomerById.response.body.content.isArchived = true;
    const aliases = TestUtils.batchRequestStub([getCustomerById, TransactionRequests.getTransactions()]);
    cy.get('fin-customer-card').eq(0).click();

    cy.batchWait(aliases);

    cy.get('fin-icon-button[icon=delete] button').click();

    cy.getInput('confirmationString').type('Desejo deletar');

    const deleteAliases = TestUtils.batchRequestStub([CustomerRequests.deleteCustomer(), CustomerRequests.getCustomersV2()]);

    cy.getSubmitButton('form').contains('Sim').click();

    cy.batchWait(deleteAliases);
  });
});
