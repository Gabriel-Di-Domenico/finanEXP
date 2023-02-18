import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { UserInput } from 'src/app/core/dtos/user/userInput';

export interface AuthenticateProxyInterface {
    authUserRequest: (user: UserInput) => Observable<ResponseDto<string>>
    verifyTokenRequest:() => Observable<ResponseDto<string>>
}