import { CustomerRequests } from './requests/customerRequests';
import { TransactionRequests } from './requests/transactionRequests';
import { UserRequests } from 'cypress/mocks/requests/userRequests';
import { AuthenticateRequests } from 'cypress/mocks/requests/authenticateRequest';
export class VisitDashBoardMock {
  public verifyToken = AuthenticateRequests.verifyToken(true)
  public getUserById = UserRequests.getUserById();
  public getTransactions = TransactionRequests.getTransactions();
  public getCustomers = CustomerRequests.getCustomers();
}