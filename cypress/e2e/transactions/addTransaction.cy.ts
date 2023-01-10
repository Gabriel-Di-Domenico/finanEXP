import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';
import { TestUtils } from 'cypress/support/test.utils';
import { UserActions } from 'cypress/support/user-actions/userActions';
import { TransactionRequests } from 'cypress/mocks/requests/transactionRequests';
import { Interception } from 'cypress/types/net-stubbing';

describe('Add transaction with successfully', () => {
  it('Add revenue transaction with successfully', () => {
    UserActions.visitCreateTransaction('Receita');

    cy.get('fin-transactions-editor-dialog').should('not.be.null');

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getInput('description').type(TestUtils.mockStrings[0]);

    cy.get('fin-date-picker input').type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.get('fin-select[ng-reflect-name="categoryId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    const postTransaction = TransactionRequests.postTransaction();

    if (postTransaction.expectedBody) {
      postTransaction.expectedBody.transactionType = TransactionType.revenue;
    }

    cy.requestStub(postTransaction).as('postTransaction');

    cy.getSubmitButton('form').click();

    cy.wait('@postTransaction').then((interception: Interception) => {
      expect(interception.response?.statusCode.toString()).contains(postTransaction.response.statusCode);
      expect(interception.request?.body).contains(postTransaction.expectedBody);
    });

    const sucessMessage = postTransaction.response.body.message.message;
    cy.get('snack-bar-container').contains(sucessMessage);

  });
  it('Add expense transaction with successfully', () => {
    UserActions.visitCreateTransaction('Despesa')

    cy.get('fin-transactions-editor-dialog').should('not.be.null');

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getInput('description').type(TestUtils.mockStrings[0]);

    cy.get('fin-date-picker input').type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.get('fin-select[ng-reflect-name="categoryId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    const postTransaction = TransactionRequests.postTransaction();

    if (postTransaction.expectedBody) {
      postTransaction.expectedBody.transactionType = TransactionType.expense;
    }

    cy.requestStub(postTransaction).as('postTransaction');

    cy.getSubmitButton('form').click();

    cy.wait('@postTransaction').then((interception: Interception) => {
      expect(interception.response?.statusCode.toString()).contains(postTransaction.response.statusCode);
      expect(interception.request?.body).contains(postTransaction.expectedBody);
    });

    const sucessMessage = postTransaction.response.body.message.message;
    cy.get('snack-bar-container').contains(sucessMessage);

  });
  it('Add transfer transaction with successfully', () => {
    UserActions.visitCreateTransaction('Transferência')

    cy.get('fin-transactions-editor-dialog').should('not.be.null');

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getInput('description').type(TestUtils.mockStrings[0]);

    cy.get('fin-date-picker input').type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="senderCustomerId"]').click();
    cy.get('div[role="listbox"] mat-option').eq(1).click();

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();
    cy.get('div[role="listbox"] mat-option').eq(0).click();

    const postTransaction = TransactionRequests.postTransaction();

    if (postTransaction.expectedBody) {
      postTransaction.expectedBody.transactionType = TransactionType.transfer;
      delete postTransaction.expectedBody.categoryId
      postTransaction.expectedBody.senderCustomerId = TestUtils.mockIds[1];
    }

    cy.requestStub(postTransaction).as('postTransaction');

    cy.getSubmitButton('form').click();

    cy.wait('@postTransaction').then((interception: Interception) => {
      expect(interception.response?.statusCode.toString()).contains(postTransaction.response.statusCode);
      expect(interception.request?.body).contains(postTransaction.expectedBody);
    });

    const sucessMessage = postTransaction.response.body.message.message;
    cy.get('snack-bar-container').contains(sucessMessage);

  });
});
describe('Verify transfer validators', () => {
  it('Verify transfer validators', () => {
    UserActions.visitCreateTransaction('Transferência')

    cy.get('fin-transactions-editor-dialog').should('not.be.null');

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getInput('description').type(TestUtils.mockStrings[0]);

    cy.get('fin-date-picker input').type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="senderCustomerId"]').click();
    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();
    // Verify if mat-option is disabled
    cy.get('div[role="listbox"] mat-option[aria-disabled="true"]')
    cy.get('div[role="listbox"] mat-option').eq(1).click();

    cy.get('fin-select[ng-reflect-name="senderCustomerId"]').click();
    // Verify if second mat-option is disabled
    cy.get('div[role="listbox"] mat-option[aria-disabled="true"]').eq(1)
    cy.get('div[role="listbox"] mat-option').eq(2).click();

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();
    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.get('fin-select[ng-reflect-name="senderCustomerId"]').contains(TestUtils.mockStrings[2])

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').contains(TestUtils.mockStrings[0])
  })
})
describe('Verify revenue or expense validators', () => {
  it('Verify currency', () => {
    UserActions.visitCreateTransaction('Receita');

    cy.getInput('description').clear().type(TestUtils.mockStrings[0]);

    cy.get('fin-date-picker input').type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.get('fin-select[ng-reflect-name="categoryId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.getSubmitButton('form').should('be.disabled')

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getSubmitButton('form').should('not.be.disabled')

  });
  it('Verify date', () => {
    UserActions.visitCreateTransaction('Receita');

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getInput('description').clear().type(TestUtils.mockStrings[0]);

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.get('fin-select[ng-reflect-name="categoryId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.getSubmitButton('form').should('be.disabled')

    cy.get('fin-date-picker input').type('05/05/2022{enter}');

    cy.getSubmitButton('form').should('not.be.disabled')

  });
  it('Verify customer', () => {
    UserActions.visitCreateTransaction('Receita');

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getInput('description').clear().type(TestUtils.mockStrings[0]);

    cy.get('fin-date-picker input').type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="categoryId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.getSubmitButton('form').should('be.disabled')

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.getSubmitButton('form').should('not.be.disabled')

  });
  it('Verify category', () => {
    UserActions.visitCreateTransaction('Receita');

    cy.get('fin-input-currency').clear().type('15,00');

    cy.getInput('description').clear().type(TestUtils.mockStrings[0]);

    cy.get('fin-date-picker input').type('05/05/2022');

    cy.get('fin-select[ng-reflect-name="receiverCustomerId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.getSubmitButton('form').should('be.disabled')

    cy.get('fin-select[ng-reflect-name="categoryId"]').click();

    cy.get('div[role="listbox"] mat-option').eq(0).click();

    cy.getSubmitButton('form').should('not.be.disabled')

  });
});
