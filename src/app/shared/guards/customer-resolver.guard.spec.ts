import { TestBed } from '@angular/core/testing';

import { CustomerResolverGuard } from './customer-resolver.guard';

describe('CustomerResolverGuard', () => {
  let guard: CustomerResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
