import { UserOutput } from 'src/app/shared/support/interfaces/user/userOutput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';
import { CypressBody, CypressRequest } from './cypressRequest';
import { TestUtils } from 'cypress/support/test.utils';

export class UserRequests {
  private static baseUrl = '/users';

  public static addUser(isSuccess = true) {
    return {
      alias: 'addUser',
      url: `${this.baseUrl}/add`,
      method: 'POST',
      response: {
        statusCode: isSuccess ? 201 : 400,
        body: {
          content: null,
          message: {
            error: !isSuccess,
            message: isSuccess ? 'Usuário criado com sucesso' : 'Usuário já cadastrado',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        email: TestUtils.mockValidEmails[0],
        name: TestUtils.mockStrings[0],
        password: TestUtils.mockValidPassword[0],
      } as UserInput,
    } as CypressRequest<ResponseDto>;
  }

  public static getUserById(isSuccess = true) {
    return {
      alias: 'getUserById',
      url: `${this.baseUrl}/**`,
      method: 'GET',
      response: {
        statusCode: isSuccess ? 200 : 404,
        body: {
          content: {
            id: TestUtils.mockIds[0],
            email: TestUtils.mockValidEmails[0],
            name: TestUtils.mockStrings[0],
          } as UserOutput,
          message: {
            error: !isSuccess,
            message: isSuccess ? 'Sucesso' : 'Falha',
          },
        } as ResponseDto<UserOutput>,
      } as CypressBody<ResponseDto<UserOutput>>,
    } as CypressRequest<ResponseDto<UserOutput>>;
  }

  public static putUser(isSuccess = true) {
    return {
      alias: 'putUser',
      url: `${this.baseUrl}/**`,
      method: 'PUT',
      response: {
        statusCode: isSuccess ? 200 : 404,
        body: {
          content: null,
          message: {
            error: !isSuccess,
            message: isSuccess ? 'Sucesso' : 'Falha',
          },
        } as ResponseDto,
      } as CypressBody<ResponseDto>,
      expectedBody: {
        email: TestUtils.mockValidEmails[0],
        name: TestUtils.mockStrings[0],
        newPassword: TestUtils.mockValidPassword[1],
        password:TestUtils.mockValidPassword[0],
      } as UserInput
    } as CypressRequest<ResponseDto, UserInput>;
  }
}
