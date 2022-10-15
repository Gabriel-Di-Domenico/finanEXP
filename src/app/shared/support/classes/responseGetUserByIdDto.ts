import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { UserOutput } from '../interfaces/user/userOutput.interface';
export class ResponseGetUserByIdDto extends ResponseDto {
  user!: UserOutput;
}
