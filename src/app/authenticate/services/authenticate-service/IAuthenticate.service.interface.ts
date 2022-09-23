import { HttpErrorResponse } from '@angular/common/http';
import UserInput from "src/app/shared/support/interfaces/userInput.interface";

export default interface IAuthenticateService {
    createNewUser: (user: UserInput, callback?: (err?: HttpErrorResponse) => void) => void
    authUser: (user: UserInput, callbacl?: (err?: HttpErrorResponse) => void) => void
}