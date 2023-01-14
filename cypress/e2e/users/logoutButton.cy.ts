import { VisitUsersMock } from 'cypress/mocks/visitUsersMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Logout button', () => {
  it('Logout with successfully', () => {
    const visitUsersMock = new VisitUsersMock();
    UserActions.visitUsers(visitUsersMock);

    cy.get('button#logoutButton').click();

    cy.url().should('be.equal', 'http://localhost:4200/auth')
  })
})