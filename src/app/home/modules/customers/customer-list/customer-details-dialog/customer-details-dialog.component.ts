import { ActivatedRoute } from '@angular/router';
import { TransactionOutput } from 'src/app/shared/support/interfaces/transactions/transactionOutput';
import { GetAllFilter } from './../../../../../shared/support/interfaces/getAllFilter';
import { Subscription } from 'rxjs';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CustomerEditorDialogDataInterface } from 'src/app/shared/support/interfaces/customers/customerEditorDialogData.interface';

import { SnackBarControlService } from './../../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { CustomerEdtiorDialogComponent } from '../../customer-edtior-dialog/customer-edtior-dialog.component';
import { DialogControlService } from '../../../../../shared/support/services/dialogControl/dialog-control.service';
import { CustomersService } from '../../customers.service';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { customerTypesOptionsPortuguese } from 'src/app/shared/support/enums/customer-types-options-portuguese';
import { FinConfirmationDialogComponent } from 'src/fin-sdk/components/dialogs/fin-confirmation-dialog/fin-confirmation-dialog.component';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';
import { customerUpdateHandler } from 'src/app/shared/handlers/customerHandler/customerUpdateHandler';
import { FinConfirmationDialogData } from 'src/fin-sdk/components/dialogs/fin-confirmation-dialog/finConfirmationDialogData';

@Component({
  selector: 'app-customer-details-dialog',
  templateUrl: './customer-details-dialog.component.html',
  styleUrls: ['./customer-details-dialog.component.css'],
})
export class CustomerDetailsDialogComponent implements OnDestroy {
  public customer!: CustomerOutput;
  public customerTypesOptionsPortuguese = customerTypesOptionsPortuguese;
  public actualBalance = 0;
  public isArchivedComponent = false;
  public expenses: Array<TransactionOutput> = [];
  public revenues: Array<TransactionOutput> = [];
  public transfers: Array<TransactionOutput> = [];
  private transactions: Array<TransactionOutput> = [];
  private subscriptions: Array<Subscription> = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public customerId: string,
    private customersService: CustomersService,
    private dialogControlService: DialogControlService,
    private dialogRef: MatDialogRef<CustomerDetailsDialogComponent>,
    private snackBarControlService: SnackBarControlService,
  ) {
    if (customerId) {
      this.getCustomerById(customerId);
    }
  }
  ngOnInit(): void {
    this.getTransactions();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  public closeDetailsDialog(data?: { updated: boolean; isArchivedComponent: boolean }) {
    this.dialogControlService.closeDialog(this.dialogRef, data);
  }
  public openCustomerEditorDialog(): void {
    this.dialogControlService
      .openDialog(CustomerEdtiorDialogComponent, {
        width: '650px',
        height: '500px',
        data: { customerId: this.customer.id, operation: 'update' } as CustomerEditorDialogDataInterface,
      })
      .afterClosed()
      .subscribe({
        next: (data: { updated: boolean }) => {
          if (data?.updated) {
            this.closeDetailsDialog({ updated: true, isArchivedComponent: this.customer.isArchived });
          }
        },
      });
  }
  public openConfirmationUnarchiveCustomerDialog(){
    this.dialogControlService
      .openDialog(FinConfirmationDialogComponent, {
        width: '400px',
        height: '200px',
        data: { message: '' } as FinConfirmationDialogData,
      })
      .afterClosed()
      .subscribe({
        next: (data: { confirm: boolean }) => {
          if (data.confirm) {
            this.customersService.unArchive(this.customer, (message: Message) => {
              this.snackBarControlService.showMessage(message.message, message.error);
              this.dialogControlService.closeDialog(this.dialogRef, {
                updated: true,
                isArchivedComponent: this.customer.isArchived,
              });
              if (!message.error) {
                this.getCustomers()
              }
            });
          }
        },
      });
  }
  public openConfirmationArchiveCustomerDialog() {
    this.dialogControlService
      .openDialog(FinConfirmationDialogComponent, {
        width: '400px',
        height: '200px',
        data: { message: '' } as FinConfirmationDialogData,
      })
      .afterClosed()
      .subscribe({
        next: (data: { confirm: boolean }) => {
          if (data.confirm) {
            this.customersService.archive(this.customer, (message: Message) => {
              this.snackBarControlService.showMessage(message.message, message.error);
              this.dialogControlService.closeDialog(this.dialogRef, {
                updated: true,
                isArchivedComponent: this.customer.isArchived,
              });
              if (!message.error) {
                this.getCustomers()
              }
            });
          }
        },
      });
  }
  public openConfirmationDeleteCustomerDialog() {
    this.dialogControlService
      .openDialog(FinConfirmationDialogComponent, {
        width: '400px',
        height: '300px',
        data: {
          message: 'Ao deletar uma carteira, todas as transações relacionadas serão deletadas',
          withVerification: true,
        } as FinConfirmationDialogData,
      })
      .afterClosed()
      .subscribe({
        next: (data: { confirm: boolean }) => {
          if (data.confirm) {
            this.customersService.delete(this.customer.id, (message: Message) => {
              this.snackBarControlService.showMessage(message.message, message.error);
              this.dialogControlService.closeDialog(this.dialogRef, {
                updated: true,
                isArchivedComponent: this.customer.isArchived,
              });
              if (!message.error) {
                this.getCustomers()
              }
            });
          }
        },
      });
  }
  private getCustomers() {
    this.customersService.getAll(undefined, (data: ResponseDto<Array<CustomerOutput>>) => {
      customerUpdateHandler.emit(data.content)
    });
  }
  private getCustomerById(customerId: string) {
    this.customersService.getById(customerId, (data: ResponseDto<CustomerOutput>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      } else {
        this.customer = data.content;
        this.getActualBalance();
      }
    });
  }
  private getActualBalance() {
    this.actualBalance = this.customer.actualBalance;
  }
  private getTransactions() {
    const filter = {
      customerId: this.customerId,
    } as GetAllFilter;
    this.customersService.getAllTransactions(filter, (data: ResponseDto<Array<TransactionOutput>>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      } else {
        this.transactions = data.content;
        this.getTransactionsData();
      }
    });
  }
  private getTransactionsData() {
    this.expenses = [];
    this.revenues = [];
    this.transfers = [];
    this.transactions.forEach((transacion: TransactionOutput) => {
      if (transacion.transactionType === TransactionType.expense) {
        this.expenses.push(transacion);
      }
      if (transacion.transactionType === TransactionType.revenue) {
        this.revenues.push(transacion);
      }
      if (transacion.transactionType === TransactionType.transfer) {
        this.transfers.push(transacion);
      }
    });
  }
}
