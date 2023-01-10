import { Interception } from 'cypress/types/net-stubbing';
import { CategoriesRequests } from 'cypress/mocks/requests/categoriesRequests';
import { TestUtils } from 'cypress/support/test.utils';
import { VisitCategoriesMock } from 'cypress/mocks/visitCategoriesMock';
import { UserActions } from 'cypress/support/user-actions/userActions';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';

describe('Add category', () => {
  it('Add revenue category with successfully', () => {
    const visitCategoriesMock = new VisitCategoriesMock();
    UserActions.visitCategories(visitCategoriesMock);

    cy.get('fin-categories fin-icon-button[icon="add"] button').click()

    cy.getInput('name').clear()
    cy.getInput('name').type(TestUtils.mockStrings[0])

    cy.requestStub(CategoriesRequests.postCategory()).as(CategoriesRequests.postCategory().alias)

    cy.getSubmitButton('form').click();

    cy.wait(`@${CategoriesRequests.postCategory().alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(CategoriesRequests.postCategory().response.statusCode)
      expect(interception.request?.body).contains(CategoriesRequests.postCategory().expectedBody)
    })
  });
  it('Add expense category with successfully', () => {
    const visitCategoriesMock = new VisitCategoriesMock();
    UserActions.visitCategories(visitCategoriesMock);

    cy.get('fin-categories header fin-icon-button[ng-reflect-color="success"]')

    cy.get('fin-button[id="menuButton"] button').contains('Receita').click()

    cy.get('transaction-menu button').contains('Despesas').click()

    cy.get('fin-categories fin-icon-button[icon="add"] button').click()

    cy.getInput('name').clear()
    cy.getInput('name').type(TestUtils.mockStrings[0])

    const postCategory = CategoriesRequests.postCategory()

    postCategory.expectedBody?.transactionType = TransactionType.expense
    cy.requestStub(postCategory).as(postCategory.alias)

    cy.getSubmitButton('form').click();

    cy.wait(`@${postCategory.alias}`).then((interception:Interception) => {
      expect(interception.response?.statusCode.toString()).contains(postCategory.response.statusCode)
      expect(interception.request?.body).contains(postCategory.expectedBody)
    })
  });
});
