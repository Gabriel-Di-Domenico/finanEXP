import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ConfigUserService } from './config-user.service';

describe('ConfigUserService', () => {
  let service: ConfigUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ConfigUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
