import { Observable } from 'rxjs';
import UserInput from '../../support/interfaces/userInput.interface';

export default interface IUserCrudProxysService {
  createNewUserRequest: (user: UserInput) => Observable<any>;
  getUserByIdRequest: (id: string) => Observable<any>;
};
