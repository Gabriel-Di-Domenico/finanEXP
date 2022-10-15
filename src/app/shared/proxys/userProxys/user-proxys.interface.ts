import { ResponseGetUserByIdDto } from 'src/app/shared/support/classes/responseGetUserByIdDto';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { UserInput } from '../../support/interfaces/user/userInput.interface';

export default interface UserProxysInterface{
  updateUserRequest: (userId: string, user: UserInput) => Observable<ResponseDto>
  createNewUserRequest: (user: UserInput) => Observable<ResponseDto>;
  getUserByIdRequest: (id: string) => Observable<ResponseGetUserByIdDto>;
}
