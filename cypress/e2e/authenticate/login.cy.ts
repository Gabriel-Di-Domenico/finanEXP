import { Interception } from 'cypress/types/net-stubbing';
import { AuthenticateRequests } from 'cypress/mocks/requests/authenticateRequest';
import { TestUtils } from 'cypress/support/test.utils';
import { UserActions } from 'cypress/support/user-actions/userActions';
import { VisitDashBoardMock } from 'cypress/mocks/visitDashboardMock';

describe('Login', () => {
  it('Login with successfully', () => {
    UserActions.visitAuthenticate();

    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('email', 'form[id=loginForm]').type(TestUtils.mockValidEmails[0]);
    cy.getInput('password', 'form[id=loginForm]').type(TestUtils.mockValidPassword[0]);

    const alias = TestUtils.batchRequestStub([AuthenticateRequests.authUser(true), AuthenticateRequests.verifyToken(true)]);

    cy.getSubmitButton('form[id=loginForm]').should('not.be.disabled').click();
    alias.forEach((alias: string) => {
      cy.wait(`@${alias}`).then((interception: Interception) => {
        if (alias === AuthenticateRequests.authUser(true).alias) {
          expect(interception.response?.statusCode.toString())
            .contains(AuthenticateRequests.authUser(true).response.statusCode);

          expect(interception.request.body).contains(AuthenticateRequests.authUser(true).expectedBody);
        }
      });
    });

    const sucessMessage = AuthenticateRequests.authUser(true).response.body.message.message;
    cy.get('snack-bar-container').contains(sucessMessage);

    cy.url().should('be.equal', 'http://localhost:4200/home/dashboard');
  });
  it('Login fail', () => {
    UserActions.visitAuthenticate();

    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('email', 'form[id=loginForm]').type(TestUtils.mockValidEmails[0]);
    cy.getInput('password', 'form[id=loginForm]').type(TestUtils.mockValidPassword[0]);

    cy.requestStub(AuthenticateRequests.authUser(false)).as('authUser');

    cy.getSubmitButton('form[id=loginForm]').should('not.be.disabled').click();

    cy.wait('@authUser').then((interception: Interception) => {
      expect(interception.response?.statusCode.toString())
        .contains(AuthenticateRequests.authUser(false).response.statusCode);
      expect(interception.request.body).contains(AuthenticateRequests.authUser(false).expectedBody);
    });

    const failMessage = AuthenticateRequests.authUser(false).response.body.message.message;
    cy.get('snack-bar-container').contains(failMessage);

    cy.url().should('not.be.equal', 'http://localhost:4200/home/dashboard');
  });

  it('Navigate to dashboard with token', () => {
    const visitDashBoardMock = new VisitDashBoardMock()
    UserActions.visitDashboard(visitDashBoardMock)

    cy.wait('@verifyToken').then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(AuthenticateRequests.verifyToken(true).response.statusCode);
    })

    cy.url().should('be.equal', 'http://localhost:4200/home/dashboard');
  })
  it('Navigate to dashboard without token', () => {

    cy.requestStub(AuthenticateRequests.verifyToken(false)).as('verifyToken')

    cy.visit('home/dashboard')

    cy.wait('@verifyToken').then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(AuthenticateRequests.verifyToken(false).response.statusCode);
    })

    cy.url().should('not.be.equal', 'http://localhost:4200/home/dashboard');
  })
});
