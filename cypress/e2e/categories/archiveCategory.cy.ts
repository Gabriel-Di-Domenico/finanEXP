import { CategoriesRequests } from 'cypress/mocks/requests/categoriesRequests';
import { VisitCategoriesMock } from 'cypress/mocks/visitCategoriesMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Archive category', () => {
  it('Archive category with successfully', () => {
    const visitCategoriesMock = new VisitCategoriesMock();
    UserActions.visitCategories(visitCategoriesMock);

    cy.get('fin-icon-button[icon=archive] button').eq(0).click();
    cy.get('fin-confirmation-dialog').should('not.be.null');

    cy.requestStub(CategoriesRequests.putCategory()).as(CategoriesRequests.putCategory().alias)
    cy.get('fin-button').contains('Sim').click()
    cy.wait(`@${CategoriesRequests.putCategory().alias}`)
  });

  it('Verify archived categories list', () => {
    const visitCategoriesMock = new VisitCategoriesMock();
    UserActions.visitCategories(visitCategoriesMock);

    cy.get('fin-icon-button[icon="more_vert"] button').click()

    cy.get('more-categories-options button').eq(0).click()

    cy.url().should('be.equal', 'http://localhost:4200/home/categories/archived')
  })
});
