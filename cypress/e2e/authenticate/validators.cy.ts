import { TestUtils } from 'cypress/support/test.utils';
import { UserActions } from 'cypress/support/user-actions/user-actions';

describe('Verify login validators', () => {
  it('Verify email', () => {
    UserActions.visitAuthenticate();

    cy.getInput('password', 'form[id=loginForm]').type(TestUtils.mockValidPassword[0]);

    cy.getInput('email', 'form[id=loginForm]').type('      ');
    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('email', 'form[id=loginForm]').type(TestUtils.mockInvalidEmails[0]);
    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('email', 'form[id=loginForm]').clear().type(TestUtils.mockInvalidEmails[1]);
    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('email', 'form[id=loginForm]').clear().type(TestUtils.mockInvalidEmails[2]);
    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('email', 'form[id=loginForm]').clear().type(TestUtils.mockInvalidEmails[3]);
    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('email', 'form[id=loginForm]').clear().type(TestUtils.mockValidEmails[0]);
    cy.getSubmitButton('form[id=loginForm]').should('not.be.disabled');
  });
  it('Verify password', () => {
    UserActions.visitAuthenticate();

    cy.getInput('email', 'form[id=loginForm]').clear().type(TestUtils.mockValidEmails[0]);

    cy.getSubmitButton('form[id=loginForm]').should('be.disabled');

    cy.getInput('password', 'form[id=loginForm]').type(TestUtils.mockValidPassword[0]);
    cy.getSubmitButton('form[id=loginForm]').should('not.be.disabled');
  });
});

describe('Verify register validators', () => {
  it('Verify name', () => {
    UserActions.visitAuthenticate();

    cy.get('app-authenticate-form mat-tab-header div[class=mat-tab-label-content]').contains('Registrar').click();

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockValidEmails[0]);
    cy.getInput('password', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);
    cy.getInput('confirmationPassword', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('name', 'form[id=registerForm]').type(TestUtils.mockLongStrings[0]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('name', 'form[id=registerForm]').clear().type(TestUtils.mockStrings[0]);
    cy.getSubmitButton('form[id=registerForm]').should('not.be.disabled');
  });
  it('Verify email', () => {
    UserActions.visitAuthenticate();

    cy.get('app-authenticate-form mat-tab-header div[class=mat-tab-label-content]').contains('Registrar').click();

    cy.getInput('password', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);
    cy.getInput('name', 'form[id=registerForm]').type(TestUtils.mockStrings[0]);
    cy.getInput('confirmationPassword', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    cy.getInput('email', 'form[id=registerForm]').type('            ');
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidEmails[0]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidEmails[1]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidEmails[2]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidEmails[3]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockValidEmails[0]);
    cy.getSubmitButton('form[id=registerForm]').should('not.be.disabled');
  });
  it('Verify password', () => {
    UserActions.visitAuthenticate();

    cy.get('app-authenticate-form mat-tab-header div[class=mat-tab-label-content]').contains('Registrar').click();

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockValidEmails[0]);
    cy.getInput('name', 'form[id=registerForm]').type(TestUtils.mockStrings[0]);
    cy.getInput('confirmationPassword', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    cy.getInput('password', 'form[id=registerForm]').type('            ');
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('password', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidPassword[0]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('password', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidPassword[1]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('password', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidPassword[2]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('password', 'form[id=registerForm]').clear().type(TestUtils.mockInvalidPassword[3]);
    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('password', 'form[id=registerForm]').clear().type(TestUtils.mockValidPassword[0]);
    cy.getSubmitButton('form[id=registerForm]').should('not.be.disabled');
  });
  it('Verify confirmation password', () => {
    UserActions.visitAuthenticate();

    cy.get('app-authenticate-form mat-tab-header div[class=mat-tab-label-content]').contains('Registrar').click();

    cy.getInput('email', 'form[id=registerForm]').clear().type(TestUtils.mockValidEmails[0]);
    cy.getInput('name', 'form[id=registerForm]').type(TestUtils.mockStrings[0]);
    cy.getInput('password', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);

    cy.getSubmitButton('form[id=registerForm]').should('be.disabled');

    cy.getInput('confirmationPassword', 'form[id=registerForm]').type(TestUtils.mockValidPassword[0]);
    cy.getSubmitButton('form[id=registerForm]').should('not.be.disabled');
  });
});
