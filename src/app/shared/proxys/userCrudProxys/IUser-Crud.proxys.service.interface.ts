import { Observable } from 'rxjs';
import User from '../../support/interfaces/user.interface';
import UserInput from "../../support/interfaces/userInput.interface";

export default interface IUserCrudProxysService {
    createNewUserRequest: (user: UserInput) => Observable<any>
    getUserByIdRequest: (id: string) => Observable<any>
    updateUserRequest: (userId: string, user: User) => Observable<any>

}