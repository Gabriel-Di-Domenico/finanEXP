import { TestUtils } from 'cypress/support/test.utils';
import { PerfilPhotoRequests } from './../../mocks/requests/perfilPhotoRequests';
import { VisitUsersMock } from 'cypress/mocks/visitUsersMock';
import { UserActions } from 'cypress/support/user-actions/userActions';

describe('Delete perfil photo', () => {
  it('Delete perfil photo with successfully', () => {
    const visitUsersMock = new VisitUsersMock();
    UserActions.visitUsers(visitUsersMock);

    cy.get('app-perfil-photo').click();

    const getPerfilPhoto = PerfilPhotoRequests.getPerfilPhoto();
    getPerfilPhoto.response.body.content = null;

    const aliases = TestUtils.batchRequestStub([getPerfilPhoto, PerfilPhotoRequests.deletePerfilPhoto()])

    cy.requestStub(getPerfilPhoto).as(getPerfilPhoto.alias);
    cy.get('fin-button').contains('Remover imagem').click()
    cy.batchWait(aliases)
  });
});
