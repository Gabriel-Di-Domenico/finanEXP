import { Message } from '../interfaces/message.interface';

export class ResponseDto<ContentType = any>{
  message!: Message;
  content!: ContentType
}
