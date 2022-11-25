import { CustomerEditorDialogDataInterface } from 'src/app/shared/support/interfaces/customers/customerEditorDialogData.interface';
import { CustomersService } from './customers.service';
import { CustomerEdtiorDialogComponent } from './customer-edtior-dialog/customer-edtior-dialog.component';
import { DialogControlService } from './../../../shared/support/services/dialogControl/dialog-control.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { take } from 'rxjs/operators';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Subscription } from 'rxjs';
import { GetAllFilter } from 'src/app/shared/support/interfaces/getAllFilter';
import { customerUpdateHandler } from 'src/app/shared/handlers/customerHandler/customerUpdateHandler';

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
    this.customersService.getAll(undefined, (data: ResponseDto<Array<CustomerOutput>>) => {
      customerUpdateHandler.emit(data.content)
    });
  }
}
