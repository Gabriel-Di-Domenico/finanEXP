import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CustomerOutput } from '../../interfaces/customers/customerOutput.interface';
export class ResponseGetAllCustomersDto extends ResponseDto {
  customers!: Array<CustomerOutput>;
}
