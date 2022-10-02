import Message from 'src/app/shared/support/interfaces/message.interface';
import UserPasswordDto from 'src/app/shared/support/interfaces/userPasswordDto.interface';

export default interface ISecurityService {
    updateUserPassword: (userId: string, passwordConfigs: UserPasswordDto, callback?:(message:Message) => void) => void
}