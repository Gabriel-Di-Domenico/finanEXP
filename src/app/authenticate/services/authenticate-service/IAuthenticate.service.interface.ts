import { UserInput } from 'src/app/core/dtos/user/userInput';
import { Message } from 'src/app/shared/support/interfaces/message.interface';

export interface IAuthenticateService {
    createNewUser: (user: UserInput, callback?:(data:Message) => void) => void
    authUser: (user: UserInput, callback?:(data:Message) => void) => void
}