import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { PerfilPhotoOutput } from '../../interfaces/perfilPhoto/perfilPhotoOutput';
export interface ResponseGetPerfilPhotoDto extends ResponseDto{
  perfilPhoto: PerfilPhotoOutput
}