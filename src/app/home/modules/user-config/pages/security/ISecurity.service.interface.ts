import { HttpErrorResponse } from '@angular/common/http';
import UserPasswordDto from 'src/app/shared/support/interfaces/userPasswordDto.interface';

export default interface ISecurityService {
    updateUserPassword: (userId: string, passwordConfigs: UserPasswordDto, callback?:Function) => void
}