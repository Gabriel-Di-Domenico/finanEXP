import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { UserInput } from 'src/app/core/dtos/user/userInput';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';

export interface UserProxysInterface{
  updateUserRequest: (userId: string, user: UserInput) => Observable<ResponseDto>
  createNewUserRequest: (user: UserInput) => Observable<ResponseDto>;
  getUserByIdRequest: (id: string) => Observable<ResponseDto<UserOutput>>;
}
