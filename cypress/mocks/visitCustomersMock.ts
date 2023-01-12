import { CustomerRequests } from 'cypress/mocks/requests/customerRequests';
import { AuthenticateRequests } from './requests/authenticateRequest';
import { UserRequests } from './requests/userRequests';

export class VisitCustomersMock {
  public verifyToken = AuthenticateRequests.verifyToken(true);
  public getUserById = UserRequests.getUserById();
  public getCustomers = CustomerRequests.getCustomers();

}
