import { CustomerInput } from 'src/app/shared/support/interfaces/customers/customerInput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { CustomerOutput } from '../../support/interfaces/customers/customerOutput.interface';
export interface CustomerProxyInterface {
  create:(customer:CustomerInput) => Observable<ResponseDto>
  getAll:() => Observable<ResponseDto<Array<CustomerOutput>>>
  getById:(customerId:string) => Observable<ResponseDto<CustomerOutput>>
  delete:(customerId:string) => Observable<ResponseDto>
}