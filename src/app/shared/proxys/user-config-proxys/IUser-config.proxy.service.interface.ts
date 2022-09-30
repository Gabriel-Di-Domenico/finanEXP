import { Observable } from 'rxjs';
import User from '../../support/interfaces/user.interface';
import  UserPasswordDto  from 'src/app/shared/support/interfaces/userPasswordDto.interface';

export default interface IUserConfigProxyService {
    updateUserRequest: (userId: string, user: User) => Observable<any>
    updateUserPasswordRequest: (userId: String, passwordConfigs: UserPasswordDto) => Observable<any>
}