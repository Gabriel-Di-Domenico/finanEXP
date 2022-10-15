import ResponseAuthUserDto from 'src/app/shared/support/classes/responseAuthUserDto';
import { Observable } from 'rxjs';
import UserInput from '../../support/interfaces/user/userInput.interface';
import ResponseVerifyTokenDto from '../../support/classes/responseVerifyTokenDto';

export default interface AuthenticateProxyInterface {
    authUserRequest: (user: UserInput) => Observable<ResponseAuthUserDto>
    verifyTokenRequest:() => Observable<ResponseVerifyTokenDto>
};