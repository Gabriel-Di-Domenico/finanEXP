import { TestBed } from '@angular/core/testing';

import { AuthenticateService} from './authenticate-service.service';

describe('AuthenticateServiceService', () => {
  let service: AuthenticateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('The register method, register a new user in database', () => {
    const users = service.users
    expect(users.length).toBe(0)
    const newUser = {
      name: 'teste',
      email: 'teste@teste.com',
      password: 123456
    }
    service.registerNewUser(newUser)
    expect(users[0]).toBe(newUser)
  })
});
