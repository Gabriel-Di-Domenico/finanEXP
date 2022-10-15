import { ResponseGetAllCustomersDto } from 'src/app/shared/support/classes/customers/responseGetAllCustomersDto';
import { CustomersProxyService } from './../proxys/customersProxys/customers-proxy.service';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerResolverGuard implements Resolve<CustomerOutput> {
  constructor(
    private customersProxyService:CustomersProxyService
  ){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.customersProxyService.getAll().pipe(
      map((data:ResponseGetAllCustomersDto) => data.customers)
    );
  }
}
