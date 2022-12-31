import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';
import { CypressBody, CypressRequest } from './cypressRequest';
import { TestUtils } from 'cypress/support/test.utils';

export class UserRequests {
  private static baseUrl = 'users'

  public static addUser(isSuccess:boolean) {
    return {
      alias:'addUser',
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
}
