import { UserInput } from '../support/interfaces/userInput.interface';
import { VerifyTokenService } from '../support/services/verify-token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverGuard implements Resolve<UserInput> {
  constructor(private verifyTokenService: VerifyTokenService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.verifyTokenService.verifyToken()
  }

}
