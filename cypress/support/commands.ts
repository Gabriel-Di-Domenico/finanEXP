import { CypressRequest } from '../mocks/requests/cypressRequest';

/* Cypress.Commands.add('batchRequestStub', (requests:Array<CypressRequestV2<any>> ) => {
  const aliases = [];
  if (!requests) {
    return cy.wrap(aliases);
  }
  let normalizedRequestsToStub = requests;
  if (!Array.isArray(requests)) {
    normalizedRequestsToStub = [requests]
  }
  for (let i = 0; i < normalizedRequestsToStub.length; i++) {
    const request = normalizedRequestsToStub[i];
    const requestAlias = `${request.method}-${request.url}-${Math.round(Math.random() * 1000)}`;
    cy.intercept(request.method, request.url, request.response).as(requestAlias);
    aliases.push(`@${requestAlias}`);
  }
  return cy.wrap(aliases);
}); */
/*
Cypress.Commands.add('validateRequestBody', (body, response) => {
  expect(body).to.deep.include(response);
});
Cypress.Commands.add('validateRequestStatusCode', (statusCode) => {
  expect(statusCode).to.eql(200);
}); */
Cypress.Commands.add('getInput', (formControlName: string, screen?: string) => {
  if (screen != null) {
    return cy.get(`${screen} fin-input[ng-reflect-name=${formControlName}] input`);
  }
  return cy.get(`fin-input[ng-reflect-name=${formControlName}] input`);
});
Cypress.Commands.add('getSubmitButton', (form: string) => {
  if (form != null) {
    return cy.get(`${form} fin-submit-button button`);
  }
  return cy.get('fin-submit-button button');
});
Cypress.Commands.add('requestStub', (request: CypressRequest<unknown>) =>
  cy.intercept(request.method, request.url, request.response)
);
