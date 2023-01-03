import ptBr from '@angular/common/locales/pt';
import { CategoryOutput } from './../../../../shared/support/interfaces/categories/categoryOutput';
import { GetAllFilter } from './../../../../shared/support/interfaces/getAllFilter';
import { ResponseDto } from './../../../../shared/support/classes/responseDto';
import { TransactionsService } from '../transactions.service';
import { TransactionOutput } from 'src/app/shared/support/interfaces/transactions/transactionOutput';
import { TransactionType } from './../../../../shared/support/enums/transactionTypes/transaction-types';
import { Component, Input, OnInit, ViewChild, EventEmitter, OnDestroy, LOCALE_ID } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DialogControlService } from 'src/app/shared/support/services/dialogControl/dialog-control.service';
import { SnackBarControlService } from 'src/app/shared/support/services/snackBarControl/snack-bar-control.service';
import { FinConfirmationDialogComponent } from 'src/fin-sdk/components/dialogs/fin-confirmation-dialog/fin-confirmation-dialog.component';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { registerLocaleData } from '@angular/common';
import { TransactionsEditorDialogComponent } from 'src/app/home/components/transactions-editor-dialog/transactions-editor-dialog.component';
import { TransactionsEditorDialogData } from 'src/app/shared/support/interfaces/transactions/TransactionsEditorDialogData';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { transactionUpdatedHandler } from 'src/app/shared/handlers/transactionHandler/transactionUpdatedHandler';
registerLocaleData(ptBr);
@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  @Input() public transactionType!: TransactionType;
  @Input() transactions!: Array<TransactionOutput>;
  @ViewChild(MatTable) table!: MatTable<{ name: string }>;
  public transactionTypes = TransactionType;
  public displayedColumns: string[] = [
    'description',
    'date',
    'category',
    'receiverCustomer',
    'value',
    'actions',
  ];
  public displayedColumnsTransfer: string[] = [
    'description',
    'date',
    'receiverCustomer',
    'senderCustomer',
    'value',
    'actions',
  ];
  public dataSource: Array<{
    id: string;
    description: string;
    date: Date;
    category?: string;
    receiverCustomer: string;
    senderCustomer?: string;
    value: number;
    transactionType: TransactionType;
  }> = [];

  public loaded = false;
  public transactionTypeEnum = TransactionType
  private customers: Array<CustomerOutput> = [];
  private categories: Array<CategoryOutput> = [];
  private getterControl = new EventEmitter<'customer' | 'category' | 'transactions'>();
  private transactionTypeChangesubscription!: Subscription;

  constructor(
    private transactionsService: TransactionsService,
    private dialogControlService: DialogControlService,
    private snackBarControlService: SnackBarControlService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.transactionTypeChangesubscription = transactionUpdatedHandler.subscribe(() => {
      this.getData();
    });
  }
  ngOnDestroy(): void {
    this.transactionTypeChangesubscription.unsubscribe();
  }
  public openTransactionEditorDialog(transaction: TransactionOutput): void {
    this.dialogControlService
      .openDialog(TransactionsEditorDialogComponent, {
        width: '410px',
        height: '600px',
        data: {
          operation: 'update',
          transactionType: transaction.transactionType,
          transactionId: transaction.id,
        } as TransactionsEditorDialogData,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          this.getData();
        },
      });
  }
  public openConfirmationDialog(transaction: TransactionOutput) {
    this.dialogControlService
      .openDialog(FinConfirmationDialogComponent, {
        width: '400px',
        height: '200px',
        data: { message: 'Uma vez deletada a transação não poderá ser recuperada' },
      })
      .afterClosed()
      .subscribe({
        next: (data: { confirm: boolean }) => {
          if (data.confirm) {
            this.transactionsService.delete(transaction.id, (message: Message) => {
              if (!message.error) {
                this.getTransactions();
                transactionUpdatedHandler.emit();
              }
              this.snackBarControlService.showMessage(message.message, message.error);
            });
          }
        },
      });
  }
  private getData() {
    this.getDataSource();
    if (this.transactionType !== TransactionType.transfer) {
      this.getCategories();
    } else {
      this.getterControl.emit('category');
    }
    this.getCustomers();
    this.getTransactions();
  }
  private getTransactions(): void {
    const filter = {
      transactionType: this.transactionType,
    } as GetAllFilter;

    this.transactionsService.getAll(filter, (data: ResponseDto<Array<TransactionOutput>>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      }
      this.transactions = data.content;
      this.getterControl.emit('transactions');
    });
  }
  private getCustomers(): void {
    this.transactionsService.getAllCustomers(undefined, (data: ResponseDto<Array<CustomerOutput>>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      }
      this.customers = data.content;
      this.getterControl.emit('customer');
    });
  }
  private getCategories(): void {
    this.transactionsService.getAllCategories(undefined, (data: ResponseDto<Array<CategoryOutput>>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      }
      this.categories = data.content;
      this.getterControl.emit('category');
    });
  }
  private getDataSource(): void {
    let customerReady = false;
    let categoryReady = false;
    let transactionsReady = false;
    const subscription = this.getterControl.subscribe((entity: 'customer' | 'category' | 'transactions') => {
      if (entity === 'category') categoryReady = true;
      if (entity === 'customer') customerReady = true;
      if (entity === 'transactions') transactionsReady = true;

      if (categoryReady && customerReady && transactionsReady) {
        this.dataSource = [];
        this.transactions.forEach((transaction: TransactionOutput) => {
          const category = this.categories.find((category: CategoryOutput) => category.id === transaction.categoryId);
          const receiverCustomer = this.customers.find(
            (customer: CustomerOutput) => customer.id === transaction.receiverCustomerId
          );
          if (this.transactionType === TransactionType.transfer && receiverCustomer != null) {
            const senderCustomer = this.customers.find(
              (customer: CustomerOutput) => customer.id === transaction.senderCustomerId
            );
            this.dataSource.push({
              id: transaction.id,
              description: transaction.description,
              receiverCustomer: receiverCustomer.name,
              senderCustomer: senderCustomer?.name,
              value: transaction.value,
              date: transaction.date,
              transactionType: transaction.transactionType,
            });
          } else if (category != null && receiverCustomer != null) {
            this.dataSource.push({
              id: transaction.id,
              description: transaction.description,
              category: category.name,
              receiverCustomer: receiverCustomer.name,
              value: transaction.value,
              date: transaction.date,
              transactionType: transaction.transactionType,
            });
          }
          this.table.renderRows();
        });
        categoryReady = false;
        customerReady = false;
        transactionsReady = false;
        subscription.unsubscribe();
        this.loaded = true;
      }
    });
  }
}
