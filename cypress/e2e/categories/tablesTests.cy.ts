import { VisitCategoriesMock } from 'cypress/mocks/visitCategoriesMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Table list test', () => {
  it('Verify number of items in the table', () => {
    const visitCategoriesMock = new VisitCategoriesMock();
    UserActions.visitCategories(visitCategoriesMock);
    const numberOfCategories = visitCategoriesMock.getCategories.response.body.content.length
    cy.get('table tbody tr ').should('have.length', numberOfCategories )
  });
});
