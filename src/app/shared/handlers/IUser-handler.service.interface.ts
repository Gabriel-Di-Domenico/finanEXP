import { Observable } from 'rxjs';
export interface IUserHandlerService {
    registerGetUser: () => Observable<any>
    emit: (id: string) => void
}