import { Interception } from 'cypress/types/net-stubbing';
import { UserRequests } from 'cypress/mocks/requests/userRequests';
import { TestUtils } from 'cypress/support/test.utils';
import { VisitUsersMock } from './../../mocks/visitUsersMock';
import { UserActions } from './../../support/user-actions/userActions';
describe('Update user', () => {
  it('Update user perfil with successfully', () => {
    const visitUsersMock = new VisitUsersMock();
    UserActions.visitUsers(visitUsersMock);

    cy.getInput('name').clear()
    cy.getInput('name').type(TestUtils.mockStrings[0])

    cy.getInput('email').clear();
    cy.getInput('email').type(TestUtils.mockValidEmails[0])

    const putRequest = UserRequests.putUser()
    delete putRequest.expectedBody?.newPassword
    delete putRequest.expectedBody?.password
    cy.requestStub(putRequest).as(putRequest.alias);
    cy.getSubmitButton('form').click();
    cy.wait(`@${putRequest.alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(putRequest.response.statusCode);
      expect(interception.request?.body).contains(putRequest.expectedBody);
    })
  })

  it('Update user security information with successfully', () => {
    const visitUsersMock = new VisitUsersMock();
    UserActions.visitUsers(visitUsersMock);

    cy.get('nav a').contains('Segurança').click();

    cy.getInput('actualPassword').type(TestUtils.mockValidPassword[0])

    cy.getInput('newPassword').type(TestUtils.mockValidPassword[1])
    cy.getInput('confirmPassword').type(TestUtils.mockValidPassword[1])

    cy.requestStub(UserRequests.putUser()).as(UserRequests.putUser().alias);
    cy.getSubmitButton('form').click();
    cy.wait(`@${UserRequests.putUser().alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(UserRequests.putUser().response.statusCode);
      expect(interception.request?.body).contains(UserRequests.putUser().expectedBody);
    })
  })
  it('Update user security information with fail', () => {
    const visitUsersMock = new VisitUsersMock();
    UserActions.visitUsers(visitUsersMock);

    cy.get('nav a').contains('Segurança').click();

    cy.getInput('actualPassword').type(TestUtils.mockValidPassword[0])

    cy.getInput('newPassword').type(TestUtils.mockValidPassword[1])
    cy.getInput('confirmPassword').type(TestUtils.mockValidPassword[2])

    cy.getSubmitButton('form').click();

    cy.get('simple-snack-bar').contains('não correspondem').should('not.be.null')

  })
})