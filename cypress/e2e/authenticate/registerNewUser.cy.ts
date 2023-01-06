import { TestUtils } from './../../support/test.utils';
import { UserActions } from 'cypress/support/user-actions/userActions';
import { Interception } from 'cypress/types/net-stubbing';
import { UserRequests } from 'cypress/mocks/requests/userRequests';
import { AuthenticateRequests } from 'cypress/mocks/requests/authenticateRequest';

describe('Register new user', () => {
  it('Register new user with successfully', () => {
    UserActions.visitAuthenticate();

    cy.get('app-authenticate-form mat-tab-header div[class=mat-tab-label-content]').contains('Registrar').click();

    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('name', 'form[id=registerForm]').type(TestUtils.mockStrings[0]);

    cy.getInput('email', 'form[id=registerForm]').type(TestUtils.mockValidEmails[0]);

    cy.getInput('password', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    cy.getInput('confirmationPassword', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    const aliases = TestUtils.batchRequestStub([
      UserRequests.addUser(true),
      AuthenticateRequests.authUser(false)
    ]);

    cy.getSubmitButton('form[id=registerForm]').should('not.be.disabled').click();

    aliases.forEach((alias: string) => {
      cy.wait(`@${alias}`).then((interception: Interception) => {
        if (alias === UserRequests.addUser(true).alias) {
          expect(interception.response?.statusCode.toString()).contains(UserRequests.addUser(true).response.statusCode);
          expect(interception.request.body).contains(UserRequests.addUser(true).expectedBody);
        }
      });
    });

    const successMessage = UserRequests.addUser(true).response.body.message.message;
    cy.get('snack-bar-container').contains(successMessage);
  });
  it('Register new user fail', () => {
    UserActions.visitAuthenticate();

    cy.get('app-authenticate-form mat-tab-header div[class=mat-tab-label-content]').contains('Registrar').click();

    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('name', 'form[id=registerForm]').type(TestUtils.mockStrings[0]);

    cy.getInput('email', 'form[id=registerForm]').type(TestUtils.mockValidEmails[0]);

    cy.getInput('password', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    cy.getInput('confirmationPassword', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    cy.requestStub(UserRequests.addUser(false)).as('addUser');

    cy.getSubmitButton('form[id=registerForm]').should('not.be.disabled').click();

    cy.wait('@addUser').then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(UserRequests.addUser(false).response.statusCode);
      expect(interception.request.body).contains(UserRequests.addUser(false).expectedBody);
    })

    const failMessage = UserRequests.addUser(false).response.body.message.message;
    cy.get('snack-bar-container').contains(failMessage);
  })
});
