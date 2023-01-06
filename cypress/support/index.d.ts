// / <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getInput(formControlName: string, screen?: string): Chainable;
    getSubmitButton(form: string): Chainable;
    requestStub(request: CypressRequest<unknown>): Chainable;
    navigateTo(menuName: string): void;
    batchWait(aliases: Array<string>): void;
  }

  interface CypressRequest<responseType, expectedBodyType = unknown> {
    alias: string;
    url: string;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    response: CypressBody<responseType>;
    expectedBody?: expectedBodyType;
  }
  interface CypressBody<T> {
    statusCode: number;
    body: T;
  }
}
