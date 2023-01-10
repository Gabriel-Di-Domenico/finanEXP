import { CategoriesRequests } from './requests/categoriesRequests';
import { AuthenticateRequests } from './requests/authenticateRequest';
import { UserRequests } from './requests/userRequests';

export class VisitCategoriesMock {
  public verifyToken = AuthenticateRequests.verifyToken(true);
  public getUserById = UserRequests.getUserById();
  public getCategories = CategoriesRequests.getCategoriesV2();

}
