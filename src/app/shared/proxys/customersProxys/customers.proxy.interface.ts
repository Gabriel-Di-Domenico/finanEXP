import { CustomerInput } from 'src/app/shared/support/interfaces/customers/customerInput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { ResponseGetAllCustomersDto } from '../../support/classes/customers/responseGetAllCustomersDto';
import { ResponseGetByIdCustomerDto } from '../../support/classes/customers/responseGetByIdCustomerDto';
export interface CustomerProxyInterface {
  create:(customer:CustomerInput) => Observable<ResponseDto>
  getAll:() => Observable<ResponseGetAllCustomersDto>
  getById:(customerId:string) => Observable<ResponseGetByIdCustomerDto>
  delete:(customerId:string) => Observable<ResponseDto>
}