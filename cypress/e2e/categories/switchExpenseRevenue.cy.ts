import { VisitCategoriesMock } from 'cypress/mocks/visitCategoriesMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Test switch expense revenue button', () => {
  it('switch revenue to expense', () => {
    const visitCategoriesMock = new VisitCategoriesMock()
    UserActions.visitCategories(visitCategoriesMock);

    cy.get('fin-categories header fin-icon-button[ng-reflect-color="success"]')

    cy.get('fin-button[id="menuButton"] button').contains('Receita').click()

    cy.get('transaction-menu button').contains('Despesas').click()

    cy.get('fin-button[id="menuButton"] button').contains('Despesa')

    cy.get('fin-categories header fin-icon-button[ng-reflect-color="warn"]')

    cy.get('fin-button[id="menuButton"] button').contains('Despesa').click()

    cy.get('transaction-menu button').contains('Receitas').click()

    cy.get('fin-button[id="menuButton"] button').contains('Receita')

    cy.get('fin-categories header fin-icon-button[ng-reflect-color="success"]')
  })

});
