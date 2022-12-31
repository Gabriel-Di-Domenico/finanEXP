import { CypressRequest } from 'cypress/mocks/requests/cypressRequest';

export class TestUtils {
  public static mockValidEmails = ['email@teste.com', 'fin@teste.com', 'exp@teste.com'];

  public static mockInvalidEmails = ['email@.com', 'fin@teste.com ', ' exp@teste.com', 'invalidEmail.com'];

  public static mockStrings = ['Fulano', 'Siclano', 'Beltrano'];

  public static mockLongStrings = [
    'It is a long established fact that a reader will be distracted by the readable content.',
    'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  ];

  public static mockValidPassword = ['aB@%3nbx', 'nbx@%aB', 'nBaX%@#b23'];

  public static mockInvalidPassword = ['ab@%3nbasklhasjdkhksad@s451asdp2132', 'nbx51aB', 'nBaX%@#bbc', 'ab@%3nbx'];

  public static mockJWTs = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjUxNDg5NywiaWF0IjoxNjcyNTE0ODk3fQ.w_hrznvMsAXW8Mx282LtI4Y5TJOxH1GcEA1GkQoSLQg',
  ];

  public static batchRequestStub(requests: Array<CypressRequest<unknown>>) {
    return requests.map((request: CypressRequest<unknown>) => {
      if (request.alias) {
        cy.requestStub(request).as(request.alias);
      }
      return request.alias;
    });
  }
}
