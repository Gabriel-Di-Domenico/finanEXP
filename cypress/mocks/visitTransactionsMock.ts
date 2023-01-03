import { CategoriesRequests } from './requests/categoriesRequests';
import { AuthenticateRequests } from './requests/authenticateRequest';
import { CustomerRequests } from './requests/customerRequests';
import { TransactionRequests } from './requests/transactionRequests';
import { UserRequests } from './requests/userRequests';

export class VisitTransactionsMock {
  public verifyToken = AuthenticateRequests.verifyToken(true);
  public getUserById = UserRequests.getUserById();
  public getCustomers = CustomerRequests.getCustomers();
  public getCategories = CategoriesRequests.getCategories();
  public getTransactions = TransactionRequests.getTransactions();
}
