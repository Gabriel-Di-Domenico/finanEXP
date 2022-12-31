export class UserActions {
  public static visitAuthenticate() {
    cy.visit('/auth');
  }
}
