import CustomerEditorDialogDataInterface
  from 'src/app/shared/support/interfaces/customers/customerEditorDialogData.interface';
import { CustomersService } from './../customers.service';
import { CustomerDetailsDialogComponent } from './customer-details-dialog/customer-details-dialog.component';
import { CustomerEdtiorDialogComponent } from './../customer-edtior-dialog/customer-edtior-dialog.component';
import { DialogControlService } from './../../../../shared/support/services/dialogControl/dialog-control.service';
import { Component, Input, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import CustomerOutput from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { customerTypesOptionsPortuguese } from 'src/app/shared/support/enums/customer-types-options-portuguese';
import ResponseGetAllCustomersDto from 'src/app/shared/support/classes/customers/responseGetAllCustomersDto';

registerLocaleData(ptBr);

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class CustomerListComponent {
  @Input() public customers!: Array<CustomerOutput>;
  public type!: string;
  customerTypesOptionsPortuguese = customerTypesOptionsPortuguese;

  constructor(private dialogControlService: DialogControlService, private customersService: CustomersService) {}

  public openEditorDialog() {
    this.openCustomerEditorDialog();
  }
  public showDetails(customerId: string): void {
    this.dialogControlService
      .openDialog(CustomerDetailsDialogComponent, {
        width: '650px',
        height: '500px',
        data: customerId,
      })
      .afterClosed()
      .subscribe({
        next: (data: { updated: boolean }) => {
          if(data?.updated){
            this.getAllCustomers();
          }
        },
      });
  }
  public openCustomerEditorDialog(): void {
    this.dialogControlService
      .openDialog(CustomerEdtiorDialogComponent, {
        width: '650px',
        height: '500px',
        data: {
          operation:'create'
        } as CustomerEditorDialogDataInterface
      })
      .afterClosed()
      .subscribe({
        next: () => {
          this.getAllCustomers();
        },
      });
  }
  private getAllCustomers(){
    this.customersService.getAll((data: ResponseGetAllCustomersDto) => {
      this.customers = data.customers;
    });
  }
}
