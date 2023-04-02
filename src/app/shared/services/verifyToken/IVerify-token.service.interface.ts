import { Observable } from 'rxjs';
export interface IVerifyTokenService {
    verifyToken: () => Observable<any>
}