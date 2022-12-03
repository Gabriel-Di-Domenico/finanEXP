import { transactionUpdatedHandler } from '../../../shared/handlers/transactionHandler/transactionUpdatedHandler';
import { SnackBarControlService } from './../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { GetAllFilter } from './../../../shared/support/interfaces/getAllFilter';
import { CategoryOutput } from './../../../shared/support/interfaces/categories/categoryOutput';
import { ResponseDto } from './../../../shared/support/classes/responseDto';
import { TransactionsService } from '../../modules/transactions/transactions.service';
import { TransactionTypePortuguese } from './../../../shared/support/enums/transactionTypes/transaction-types-portuguese';
import { TransactionType } from './../../../shared/support/enums/transactionTypes/transaction-types';
import { DialogControlService } from './../../../shared/support/services/dialogControl/dialog-control.service';
import { TransactionEditorFormControls } from './transactionsEditorFormControls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionsEditorDialogData } from 'src/app/shared/support/interfaces/transactions/TransactionsEditorDialogData';
import { TransactionOutput } from 'src/app/shared/support/interfaces/transactions/transactionOutput';
import { finSelectOption } from 'src/app/shared/support/classes/fin-select-option';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { Message } from 'src/app/shared/support/interfaces/message.interface';

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
  private transaction!: TransactionOutput;
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
    this.getCustomerSelectOptions();
    if (this.transactionType !== TransactionType.transfer) {
      this.getCategorySelectOptions();
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
  private getCustomerSelectOptions() {
    const filter = {
      isArchived: false,
    } as GetAllFilter;
    this.transactionsService.getAllCustomers(filter, (data: ResponseDto<Array<CustomerOutput>>) => {
      if (!data.message.error) {
        data.content.forEach((customer: CustomerOutput) => {
          this.customerSelectOptions.push(new finSelectOption({ key: customer.name, value: customer.id }));
        });
      } else {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      }
    });
  }
  private getCategorySelectOptions() {
    const filter = {
      transactionType: this.transactionType,
      isArchived:false
    } as GetAllFilter;
    this.transactionsService.getAllCategories(filter, (data: ResponseDto<Array<CategoryOutput>>) => {
      if (!data.message.error) {
        data.content.forEach((category: CategoryOutput) => {
          this.categorySelectOptions.push(new finSelectOption({ key: category.name, value: category.id }));
        });
      } else {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      }
    });
  }
  private unMaskValue(): void {
    let valueUnMasked: string = this.form.get(this.formControls.value)?.value;
    if (typeof valueUnMasked === 'string') {
      valueUnMasked = valueUnMasked.replace('R$', '').replace(/\./g, '').replace(',', '.');
      this.form.get(this.formControls.value)?.setValue(Number(valueUnMasked));
    }
  }
}
