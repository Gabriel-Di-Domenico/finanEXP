import { DialogControlService, SnackBarControlService } from 'finan-exp-sdk';

import { TransactionEditorFormControls } from './transactionsEditorFormControls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finSelectOption } from 'src/app/shared/support/classes/fin-select-option';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { finSelectButton } from 'src/app/shared/support/classes/fin-select-button';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';
import { TransactionOutput } from 'src/app/core/dtos/transactions/transactionOutput';
import { TransactionsEditorDialogData } from './TransactionsEditorDialogData';
import { CategoryOutput } from 'src/app/core/dtos/categories/categoryOutput';
import { transactionUpdatedHandler } from 'src/app/shared/handlers/transactionHandler/transactionUpdatedHandler';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';
import { TransactionTypePortuguese } from 'src/app/shared/support/enums/transactionTypes/transaction-types-portuguese';
import { GetAllFilter } from 'src/app/shared/support/interfaces/getAllFilter';
import { CategoriesEditorDialogComponent } from '../../categories/categories-editor-dialog/categories-editor-dialog.component';
import { CategoriesEditorDialogData } from '../../categories/categories-editor-dialog/categoriesEditorDialogData';
import { CustomerEdtiorDialogComponent } from '../../customers/customer-edtior-dialog/customer-edtior-dialog.component';
import { CustomerEditorDialogDataInterface } from '../../customers/customer-edtior-dialog/customerEditorDialogData.interface';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'fin-transactions-editor-dialog',
  templateUrl: './transactions-editor-dialog.component.html',
  styleUrls: ['./styles/transactions-editor-dialog.component.css'],
})
export class TransactionsEditorDialogComponent {
  public label = 'Nova transação';
  public transactionTypeEnum = TransactionType;
  public transactionTypesPortuguese = TransactionTypePortuguese;
  public form!: FormGroup;
  public formControls = TransactionEditorFormControls;
  public transactionType!: TransactionType;
  public categorySelectOptions: Array<finSelectOption> = [];
  public customerSelectOptions: Array<finSelectOption> = [];
  private categories!: Array<CategoryOutput>;
  private customers!: Array<CustomerOutput>;
  private transaction!: TransactionOutput;

  public get finAddCustomerButton(): finSelectButton {
    return new finSelectButton('Adicionar carteira', () => {
      this.dialogControlService
        .openDialog(CustomerEdtiorDialogComponent, {
          width: '650px',
          height: '500px',
          data: {
            operation: 'create',
          } as CustomerEditorDialogDataInterface,
        })
        .afterClosed()
        .subscribe((result:{ updated:boolean }) => {
          if(result.updated) {
            this.dialogRef.close();
          }
        });
    });
  }

  public get finAddCategoryButton(): finSelectButton {
    return new finSelectButton('Adicionar categoria', () => {
      this.dialogControlService
        .openDialog(CategoriesEditorDialogComponent, {
          width: '400px',
          height: '220px',
          data: {
            operation: 'create',
            transactionType: this.transactionType,
          } as CategoriesEditorDialogData,
        })
        .afterClosed()
        .subscribe((result:{ updated:boolean }) => {
          if(result.updated) {
            this.dialogRef.close();
          }
        });
    });
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TransactionsEditorDialogData,
    private formBuilder: FormBuilder,
    private dialogControlService: DialogControlService,
    private dialogRef: MatDialogRef<TransactionsEditorDialogComponent>,
    private transactionsService: TransactionsService,
    private snackBarControlService: SnackBarControlService
  ) {
    if (this.data.operation === 'update') {
      this.label = 'Editar Transação';
      this.getTransactionById();
    }
    this.transactionType = this.data.transactionType;
    this.createForm();

    this.getAllCustomers();

    if (this.transactionType !== TransactionType.transfer) {
      this.getAllCategories();
    }
  }
  public disableSelectedOptions() {
    const receiverCustomerValue = this.form.get(this.formControls.receiverCustomerId)?.value;
    const senderCustomerValue = this.form.get(this.formControls.senderCustomerId)?.value;
    this.customerSelectOptions.forEach((option: finSelectOption) => {
      if (option.value === receiverCustomerValue || option.value === senderCustomerValue) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
  }
  public closeEditorDialog() {
    this.dialogControlService.closeDialog(this.dialogRef);
  }
  public submitForm() {
    this.unMaskValue();

    if (this.data.operation === 'create') {
      this.transactionsService.create(this.form.value, (message: Message) => {
        if (!message.error) {
          transactionUpdatedHandler.emit();
        }
        this.snackBarControlService.showMessage(message.message, message.error);
        this.dialogControlService.closeDialog(this.dialogRef);
      });
    } else {
      this.transactionsService.update(this.transaction.id, this.form.value, (message: Message) => {
        if (!message.error) {
          transactionUpdatedHandler.emit();
        }
        this.snackBarControlService.showMessage(message.message, message.error);
        this.dialogControlService.closeDialog(this.dialogRef, { updated: true });
      });
    }
  }
  public canSave(): boolean {
    return this.form.valid && this.form.touched;
  }
  public getCustomerLabel(): string {
    if (this.transactionType !== TransactionType.transfer) {
      return 'Carteira';
    } else {
      return 'Carteira destinatária';
    }
  }
  private getTransactionById() {
    this.transactionsService.getById(this.data.transactionId, (data: ResponseDto<TransactionOutput>) => {
      if (!data.message.error) {
        this.transaction = data.content;

        this.populateForm();
      }
    });
  }
  private createForm() {
    this.form = this.formBuilder.group({});
    if (this.transactionType === TransactionType.transfer) {
      this.form.addControl(this.formControls.senderCustomerId, this.formBuilder.control(null, [Validators.required]));
    } else {
      this.form.addControl(this.formControls.categoryId, this.formBuilder.control(null, [Validators.required]));
    }
    this.form.addControl(this.formControls.value, this.formBuilder.control(null, [Validators.required]));
    this.form.addControl(this.formControls.description, this.formBuilder.control(null));
    this.form.addControl(this.formControls.transactionType, this.formBuilder.control(this.data.transactionType));
    this.form.addControl(this.formControls.date, this.formBuilder.control(null, [Validators.required]));
    this.form.addControl(this.formControls.receiverCustomerId, this.formBuilder.control(null, [Validators.required]));
  }
  private populateForm() {
    this.form.get(this.formControls.value)?.setValue(this.transaction.value);
    this.form.get(this.formControls.description)?.setValue(this.transaction.description);
    this.form.get(this.formControls.categoryId)?.setValue(this.transaction.categoryId);
    this.form.get(this.formControls.receiverCustomerId)?.setValue(this.transaction.receiverCustomerId);
    this.form.get(this.formControls.senderCustomerId)?.setValue(this.transaction.senderCustomerId);
    this.form.get(this.formControls.transactionType)?.setValue(this.transaction.transactionType);
    this.form.get(this.formControls.date)?.setValue(this.transaction.date);
  }
  private setCustomerSelectOptions() {
    this.customers.forEach((customer: CustomerOutput) => {
      this.customerSelectOptions.push(new finSelectOption({ key: customer.name, value: customer.id }));
    });
  }
  private setCategorySelectOptions() {
    this.categories.forEach((category: CategoryOutput) => {
      this.categorySelectOptions.push(new finSelectOption({ key: category.name, value: category.id }));
    });
  }
  private unMaskValue(): void {
    let valueUnMasked: string = this.form.get(this.formControls.value)?.value;
    if (typeof valueUnMasked === 'string') {
      valueUnMasked = valueUnMasked.replace('R$', '').replace(/\./g, '').replace(',', '.');
      this.form.get(this.formControls.value)?.setValue(Number(valueUnMasked));
    }
  }
  private getAllCustomers() {
    const filter = {
      isArchived: false,
    } as GetAllFilter;

    this.transactionsService.getAllCustomers(filter, (data: ResponseDto<Array<CustomerOutput>>) => {
      if (!data.message.error) {
        this.customers = data.content;
        this.setCustomerSelectOptions();
      } else {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      }
    });
  }
  private getAllCategories() {
    const filter = {
      transactionType: this.transactionType,
      isArchived: false,
    } as GetAllFilter;

    this.transactionsService.getAllCategories(filter, (data: ResponseDto<Array<CategoryOutput>>) => {
      if (!data.message.error) {
        this.categories = data.content;
        this.setCategorySelectOptions();
      } else {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      }
    });
  }
}
