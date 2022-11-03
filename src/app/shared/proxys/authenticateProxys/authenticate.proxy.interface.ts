import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { UserInput } from '../../support/interfaces/user/userInput.interface';

export interface AuthenticateProxyInterface {
    authUserRequest: (user: UserInput) => Observable<ResponseDto<string>>
    verifyTokenRequest:() => Observable<ResponseDto<string>>
}