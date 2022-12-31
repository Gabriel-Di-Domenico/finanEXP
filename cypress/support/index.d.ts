// / <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getInput(formControlName: string, screen?: string): Chainable;
    getSubmitButton(from: string): Chainable;
    requestStub(request: CypressRequest<unknown>): Chainable;
  }

  interface CypressRequest<T> {
    alias: string;
    url: string;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    response: CypressBody<T>;
    expectedBody?: unknown;
  }
  interface CypressBody<T> {
    statusCode: number;
    body: T;
  }
}
