import { TestBed } from '@angular/core/testing';

import { CustomersProxyService } from './customers-proxy.service';

describe('CustomersProxyService', () => {
  let service: CustomersProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
