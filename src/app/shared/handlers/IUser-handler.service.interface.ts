import { Observable } from 'rxjs';
export default interface IUserHandlerService {
    registerGetUser: () => Observable<any>
    emit: (id: string) => void
}