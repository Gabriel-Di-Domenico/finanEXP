import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';
import { CustomerInput } from 'src/app/core/dtos/customers/customerInput';
export interface CustomerProxyInterface {
  create:(customer:CustomerInput) => Observable<ResponseDto>
  getAll:() => Observable<ResponseDto<Array<CustomerOutput>>>
  getById:(customerId:string) => Observable<ResponseDto<CustomerOutput>>
  delete:(customerId:string) => Observable<ResponseDto>
}