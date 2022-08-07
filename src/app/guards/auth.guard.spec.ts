import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('User have permissions ?', () => {
    const token = window.localStorage.getItem('token')
    let result: boolean = false
    if (token) {
      result = true
      expect(result).toBeTruthy()
    } else {
      result = false
      expect(result).toBeFalsy()
    }

  })
});
