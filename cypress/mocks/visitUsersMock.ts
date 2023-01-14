import { AuthenticateRequests } from './requests/authenticateRequest';
import { PerfilPhotoRequests } from './requests/perfilPhotoRequests';
import { UserRequests } from './requests/userRequests';

export class VisitUsersMock {
  public verifyToken = AuthenticateRequests.verifyToken(true);
  public getUserById = UserRequests.getUserById();
  public getPerfilPhoto = PerfilPhotoRequests.getPerfilPhoto()
}
