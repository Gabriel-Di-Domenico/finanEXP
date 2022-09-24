import { HttpErrorResponse } from '@angular/common/http';
import User from "src/app/shared/support/interfaces/user.interface";

export default interface IProfileService {
    updateProfilePreferences: (userId: string, user: User, callback?:Function) => void
}