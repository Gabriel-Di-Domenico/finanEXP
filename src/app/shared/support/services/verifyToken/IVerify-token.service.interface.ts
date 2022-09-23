import { Observable } from 'rxjs';
export default interface IVerifyTokenService {
    verifyToken: () => Observable<any>
}