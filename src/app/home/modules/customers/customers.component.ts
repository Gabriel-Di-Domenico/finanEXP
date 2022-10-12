import CustomerEditorDialogDataInterface
  from 'src/app/shared/support/interfaces/customers/customerEditorDialogData.interface';
import ResponseGetAllCustomersDto from 'src/app/shared/support/classes/customers/responseGetAllCustomersDto';
import { CustomersService } from './customers.service';
import { CustomerEdtiorDialogComponent } from './customer-edtior-dialog/customer-edtior-dialog.component';
import { DialogControlService } from './../../../shared/support/services/dialogControl/dialog-control.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CustomerOutput from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  public customers!: Array<CustomerOutput>;
  constructor(
    private dialogControl: DialogControlService,
     private route: ActivatedRoute,
     private customersService:CustomersService) {}
  ngOnInit() {
    this.getCustomers();
  }

  public openCustomerEditorDialog(): void {
    this.dialogControl.openDialog(CustomerEdtiorDialogComponent, {
      width: '650px',
      height: '500px',
      data:{
        operation:'create'
      } as CustomerEditorDialogDataInterface
    }).afterClosed().subscribe({
      next:() => {
        this.customersService.getAll((data:ResponseGetAllCustomersDto) => {
          this.customers = data.customers;
        });
      }
    });
  }

  private getCustomers() {
    this.route.data.pipe(take(1)).subscribe({
      next: data => {
        this.customers = data['customers'];
      },
    });
  }
}
