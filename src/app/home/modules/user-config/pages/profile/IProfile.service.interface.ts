import Message from 'src/app/shared/support/interfaces/message.interface';
import User from 'src/app/shared/support/interfaces/user/user.interface';

export default interface IProfileService {
  updateProfilePreferences: (userId: string, user: User, callback?: (message: Message) => void) => void;
}
