import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthenticateService } from './authenticate.service';

describe('AuthenticateServiceService', () => {
  let service: AuthenticateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthenticateService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
