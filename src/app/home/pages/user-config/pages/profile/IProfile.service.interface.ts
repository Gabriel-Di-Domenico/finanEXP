
import { UserInput } from 'src/app/core/dtos/user/userInput';
import { Message } from 'src/app/shared/support/interfaces/message.interface';

export interface IProfileService {
  updateProfilePreferences: (userId: string, user: UserInput, callback?: (message: Message) => void) => void;
}
