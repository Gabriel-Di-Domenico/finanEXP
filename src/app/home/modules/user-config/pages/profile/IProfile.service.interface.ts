
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';

export default interface IProfileService {
  updateProfilePreferences: (userId: string, user: UserInput, callback?: (message: Message) => void) => void;
}
