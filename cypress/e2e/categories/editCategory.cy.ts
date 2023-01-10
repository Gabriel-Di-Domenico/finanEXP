import { Interception } from 'cypress/types/net-stubbing';
import { TestUtils } from 'cypress/support/test.utils';
import { CategoriesRequests } from 'cypress/mocks/requests/categoriesRequests';
import { VisitCategoriesMock } from 'cypress/mocks/visitCategoriesMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Edit category', () => {
  it('Edit with successfully', () => {
    const visitCategoriesMock = new VisitCategoriesMock();
    UserActions.visitCategories(visitCategoriesMock);

    cy.requestStub(CategoriesRequests.getCategoryById()).as(CategoriesRequests.getCategoryById().alias)

    cy.get('fin-icon-button[icon=edit] button').eq(0).click();
    cy.get('mat-dialog-container').should('not.be.null');

    cy.wait(`@${CategoriesRequests.getCategoryById().alias}`)

    cy.getInput('name').clear()
    cy.getInput('name').type(TestUtils.mockStrings[1])
    cy.requestStub(CategoriesRequests.putCategory()).as(CategoriesRequests.putCategory().alias)
    cy.getSubmitButton('form').click()
    cy.wait(`@${CategoriesRequests.putCategory().alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(CategoriesRequests.putCategory().response.statusCode)
      expect(interception.request?.body).contains(CategoriesRequests.putCategory().expectedBody)
    })
  })
})