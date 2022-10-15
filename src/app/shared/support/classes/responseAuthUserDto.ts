import { ResponseDto } from './responseDto';

export class ResponseAuthUserDto extends ResponseDto {
  public jwt!: string;
}
