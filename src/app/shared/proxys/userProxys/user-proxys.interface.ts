import ResponseGetUserByIdDto from 'src/app/shared/support/classes/responseGetUserByIdDto';
import ResponseDto from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import UserInput from '../../support/interfaces/user/userInput.interface';
import User from '../../support/interfaces/user/user.interface';

export default interface UserProxysInterface{
  updateUserRequest: (userId: string, user: User) => Observable<ResponseDto>
  createNewUserRequest: (user: UserInput) => Observable<ResponseDto>;
  getUserByIdRequest: (id: string) => Observable<ResponseGetUserByIdDto>;
}
