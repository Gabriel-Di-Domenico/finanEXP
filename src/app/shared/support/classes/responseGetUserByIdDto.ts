import UserOutput from 'src/app/shared/support/interfaces/userOutput.interface';
import ResponseDto from 'src/app/shared/support/classes/responseDto';
export default class ResponseGetUserByIdDto extends ResponseDto {
  user!: UserOutput;
}
