import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';

export interface IAuthenticateService {
    createNewUser: (user: UserInput, callback?:(data:Message) => void) => void
    authUser: (user: UserInput, callback?:(data:Message) => void) => void
}