import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CustomerOutput } from '../../interfaces/customers/customerOutput.interface';
export class ResponseGetByIdCustomerDto extends ResponseDto {
  customer!: CustomerOutput;
}