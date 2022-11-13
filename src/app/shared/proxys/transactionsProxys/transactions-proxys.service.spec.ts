import { TestBed } from '@angular/core/testing';

import { TransactionsProxysService } from './transactions-proxys.service';

describe('TransactionsProxysService', () => {
  let service: TransactionsProxysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsProxysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
