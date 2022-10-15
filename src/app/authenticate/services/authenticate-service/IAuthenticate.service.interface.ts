import UserInput from 'src/app/shared/support/interfaces/user/userInput.interface';

export default interface IAuthenticateService {
    createNewUser: (user: UserInput, callback?:Function) => void
    authUser: (user: UserInput, callback?:Function) => void
};