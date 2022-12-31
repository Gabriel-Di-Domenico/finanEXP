import { TestUtils } from 'cypress/support/test.utils';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';
import { CypressBody, CypressRequest } from './cypressRequest';

export class AuthenticateRequests {
  private static baseUrl = 'auth';
  public static authUser(isSuccess: boolean) {
    return {
      alias: 'authUser',
      url: `${this.baseUrl}/user `,
      method: 'POST',
      response: {
        statusCode: isSuccess ? 200 : 401,
        body: {
          content: isSuccess ? TestUtils.mockJWTs[0] : null,
          message: {
            error: !isSuccess,
            message: isSuccess ? 'Usuário autenticado' : 'Usuário não autorizado',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        email: TestUtils.mockValidEmails[0],
        password: TestUtils.mockValidPassword[0],
      } as UserInput,
    } as CypressRequest<ResponseDto>;
  }
  public static verifyToken() {
    return {
      alias: 'verifyToken',
      url: `${this.baseUrl}/verifyToken `,
      method: 'GET',
      response: {
        statusCode: 200,
        body: {
          content: null,
          message: {
            error: true,
            message: 'Token inválido',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
    } as CypressRequest<ResponseDto>;
  }
}
