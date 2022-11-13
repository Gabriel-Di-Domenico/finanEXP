import { CustomerEditorDialogDataInterface }
  from 'src/app/shared/support/interfaces/customers/customerEditorDialogData.interface';
import { CustomersService } from './customers.service';
import { CustomerEdtiorDialogComponent } from './customer-edtior-dialog/customer-edtior-dialog.component';
import { DialogControlService } from './../../../shared/support/services/dialogControl/dialog-control.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { take } from 'rxjs/operators';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  public customers!: Array<CustomerOutput>;
  public subscriptions:Array<Subscription> = [];
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
        this.customersService.getAll((data:ResponseDto<Array<CustomerOutput>>) => {
          this.customers = <Array<CustomerOutput>>data.content;
        });
      }
    });
  }

  private getCustomers() {
    this.route.data.pipe(take(1)).subscribe({
      next: (data: any) => {
        this.customers = data['customers'];
      },
    });
  }
}
