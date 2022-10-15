import User from './user.interface';

export default interface UserInput{
    name: string,
    email: string,
    password?: string,
    newPassword?:string,
    perfilPhoto?: string
}
