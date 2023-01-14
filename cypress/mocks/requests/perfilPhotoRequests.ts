import { TestUtils } from './../../support/test.utils';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { PerfilPhotoOutput } from './../../../src/app/shared/support/interfaces/perfilPhoto/perfilPhotoOutput';
import { CypressBody, CypressRequest } from './cypressRequest';
export class PerfilPhotoRequests {
  private static baseUrl = '/perfilPhotos';

  public static getPerfilPhoto() {
    return {
      alias: 'getPerfilPhoto',
      url: `${this.baseUrl}`,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: {
            data: TestUtils.mockImageData,
            id: TestUtils.mockIds[0],
            name: TestUtils.mockStrings[0],
          } as PerfilPhotoOutput,
          message: {
            error: false,
            message: 'Sucesso ao adquirir foto de perfil',
          },
        } as ResponseDto<PerfilPhotoOutput> | ResponseDto,
      } as CypressBody<ResponseDto<PerfilPhotoOutput> | ResponseDto>,
    } as CypressRequest<ResponseDto<PerfilPhotoOutput> | ResponseDto>;
  }
  public static deletePerfilPhoto() {
    return {
      alias: 'deletePerfilPhoto',
      url: `${this.baseUrl}`,
      method: 'DELETE',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: false,
            message: 'Sucesso ao deletar foto de perfil',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
    } as CypressRequest<ResponseDto>;
  }
}
