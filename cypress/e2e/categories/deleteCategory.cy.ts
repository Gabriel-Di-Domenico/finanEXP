import { CategoriesRequests } from 'cypress/mocks/requests/categoriesRequests';
import { VisitCategoriesMock } from 'cypress/mocks/visitCategoriesMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Delete category', () => {
  it('Delete category with successfully', () => {
    const visitCategoriesMock = new VisitCategoriesMock();
    UserActions.visitCategories(visitCategoriesMock);

    cy.get('fin-icon-button[icon="more_vert"] button').click()

    cy.get('more-categories-options button').eq(0).click()

    cy.get('fin-icon-button[icon="delete"] button').eq(0).click()

    cy.requestStub(CategoriesRequests.deleteCategory()).as(CategoriesRequests.deleteCategory().alias)
    cy.get('fin-button').contains('Sim').click()
    cy.wait(`@${CategoriesRequests.deleteCategory().alias}`)
  })
})