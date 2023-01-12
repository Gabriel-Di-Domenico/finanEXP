import { Interception } from 'cypress/types/net-stubbing';
import { TestUtils } from 'cypress/support/test.utils';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { CustomerRequests } from 'cypress/mocks/requests/customerRequests';
import { VisitCustomersMock } from 'cypress/mocks/visitCustomersMock';
import { UserActions } from '../../support/user-actions/userActions';
describe('Add customer', () => {
  it('Add customer with successfully', () => {
    const visitCustomersMock = new VisitCustomersMock()
    UserActions.visitCustomers(visitCustomersMock);
    const customers:Array<CustomerOutput> = CustomerRequests.getCustomers().response.body.content
    cy.get('fin-customer-card').should('have.length', customers.length)
    cy.get('app-customers header fin-icon-button[icon=add] button').click()

    cy.get('fin-input-currency').type(`${TestUtils.mockNumbers[0]}`).type('0').type('0');

    cy.getInput('name').type(TestUtils.mockStrings[0])

    cy.get('fin-select[ng-reflect-name="type"]').click();
    cy.get('div[role="listbox"] mat-option').eq(0).click();

    TestUtils.batchRequestStub([CustomerRequests.getCustomersV2(), CustomerRequests.postCustomer()])
    cy.getSubmitButton('form').click();

    cy.wait(`@${CustomerRequests.postCustomer().alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(CustomerRequests.postCustomer().response.statusCode);
      expect(interception.request?.body).contains(CustomerRequests.postCustomer().expectedBody);
    })

    cy.wait(`@${CustomerRequests.getCustomersV2().alias}`)

  });
});
