import { Observable } from 'rxjs';
import UserInput from '../../support/interfaces/userInput.interface';
export default interface IAuthenticateProxyService {
    authUserRequest: (user: UserInput) => Observable<any>
}