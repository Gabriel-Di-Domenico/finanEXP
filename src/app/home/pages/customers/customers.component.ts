import { DialogControlService } from 'finan-exp-sdk';
import { CustomersService } from './customers.service';
import { CustomerEdtiorDialogComponent } from './customer-edtior-dialog/customer-edtior-dialog.component';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Subscription } from 'rxjs';
import { GetAllFilter } from 'src/app/shared/support/interfaces/getAllFilter';
import { customerUpdateHandler } from 'src/app/shared/handlers/customerHandler/customerUpdateHandler';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';
import { CustomerEditorDialogDataInterface } from './customer-edtior-dialog/customerEditorDialogData.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  public customers!: Array<CustomerOutput>;
  public subscriptions: Array<Subscription> = [];
  public isArchivedComponent = false;
  constructor(
    private dialogControl: DialogControlService,
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private router:Router
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription:Subscription) => {
      subscription.unsubscribe();
    })
  }
  ngOnInit(): void {
    this.subscriptions.push(customerUpdateHandler.subscribe((customers:Array<CustomerOutput>) => {
      this.customers = customers
    }))
    this.getIsArchivedComponent()
    this.getCustomers();
  }
  public openCustomerComponent() {
    this.router.navigate(['home', 'customers'])
  }
  public openCustomerEditorDialog(): void {
    this.dialogControl
      .openDialog(CustomerEdtiorDialogComponent, {
        width: '650px',
        height: '500px',
        data: {
          operation: 'create',
        } as CustomerEditorDialogDataInterface,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          const filter = {
            isArchived: false,
          } as GetAllFilter;
          this.customersService.getAll(filter, (data: ResponseDto<Array<CustomerOutput>>) => {
            this.customers = <Array<CustomerOutput>>data.content;
          });
        },
      });
  }
  private getIsArchivedComponent(){
    if(this.route.snapshot.url.length && this.route.snapshot.url[0].path === 'archived'){
      this.isArchivedComponent = true
    }
  }
  private getCustomers() {
    this.customersService.getAll({ isArchived: this.isArchivedComponent } as GetAllFilter, (data: ResponseDto<Array<CustomerOutput>>) => {
      customerUpdateHandler.emit(data.content)
    });
  }
}
