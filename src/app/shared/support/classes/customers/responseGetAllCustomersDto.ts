import ResponseDto from 'src/app/shared/support/classes/responseDto';
import CustomerOutput from '../../interfaces/customers/customerOutput.interface';
export default class ResponseGetAllCustomersDto extends ResponseDto {
  customers!: Array<CustomerOutput>;
}
