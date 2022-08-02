import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticateService } from './authenticate.service';

describe('AuthenticateServiceService', () => {
  let service: AuthenticateService;
  let http: HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthenticateService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('The register method, register a new user in database', () => {
    const testUser = {
      id: 1,
      name: 'Test User',
      email: 'IamATestUser@Test.com',
      password: 123456
    }
    const mockedUsers = service.getUsers()

    expect(mockedUsers[0]).toBe(testUser)

    const newUser = {
      name: 'teste',
      email: 'teste@teste.com',
      password: 123456
    }
    mockedUsers.push(newUser)
    expect(mockedUsers[mockedUsers.length]).toBe(newUser)

  })
});
