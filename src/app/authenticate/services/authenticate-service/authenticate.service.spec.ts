import { User } from './user.interface';
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
  
});
