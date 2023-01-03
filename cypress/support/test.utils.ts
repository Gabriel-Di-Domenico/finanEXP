import { CypressRequest } from 'cypress/mocks/requests/cypressRequest';

export class TestUtils {
  public static mockValidEmails = ['email@teste.com', 'fin@teste.com', 'exp@teste.com'];

  public static mockInvalidEmails = ['email@.com', 'fin@teste.com ', ' exp@teste.com', 'invalidEmail.com'];

  public static mockStrings = ['Fulano', 'Siclano', 'Beltrano', 'Simiriano', 'Sacolano', 'Sifano'];

  public static mockIds = [
    '0d64ab63-03e1-437b-bfb6-be7fce2f826d',
    'dad3b96c-0443-43fb-8fb0-b7c6bf92f323',
    '55f67939-cf55-417c-8148-cb38fd31ecab',
    'c56dcdd2-b77f-4f05-a032-88dfc88f909c',
    'e010ea40-79bf-4acb-8fc2-1713389569b3',
    'd2610b91-3b04-4082-abbd-3b6971ba2a86'
  ];

  public static mockLongStrings = [
    'It is a long established fact that a reader will be distracted by the readable content.',
    'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  ];

  public static mockValidPassword = ['aB@%3nbx', 'nbx@%aB', 'nBaX%@#b23'];

  public static mockInvalidPassword = ['ab@%3nbasklhasjdkhksad@s451asdp2132', 'nbx51aB', 'nBaX%@#bbc', 'ab@%3nbx'];

  public static mockJWTs = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzNzQzYzlmYi0zOGQ4LTQ5ZmEtYjAzMC0zMzU2ZDM3NmQwZGEiLCJuYmYiOjE2NzI1MzA1OTYsImV4cCI6MTY3MzEzNTM5NiwiaWF0IjoxNjcyNTMwNTk2fQ.Px3O4Ns0N7wYYvy4bsWvyUJnvc4_SaDibg0QFRDxQWU',
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjUxNDg5NywiaWF0IjoxNjcyNTE0ODk3fQ.w_hrznvMsAXW8Mx282LtI4Y5TJOxH1GcEA1GkQoSLQg',
  ];

  public static mockNumbers = [1, 50, 500, 100, 10000, 999999];

  public static batchRequestStub(requests: Array<CypressRequest<unknown>>) {
    return requests.map((request: CypressRequest<unknown>) => {
      if (request.alias) {
        cy.requestStub(request).as(request.alias);
      }
      return request.alias;
    });
  }
  public static getRequestsFromMock(mock: any): CypressRequest<unknown>[] {
    return Object.values(mock)
      .filter(property => property !== undefined)
      .map(property => property as CypressRequest<unknown>);
  }
}
