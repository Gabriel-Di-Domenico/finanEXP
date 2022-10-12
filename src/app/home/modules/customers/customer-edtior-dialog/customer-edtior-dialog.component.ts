import CustomerOutput from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import ResponseGetByIdCustomerDto from 'src/app/shared/support/classes/customers/responseGetByIdCustomerDto';
import { SnackBarControlService } from './../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { CustomersService } from './../customers.service';
import { DialogControlService } from './../../../../shared/support/services/dialogControl/dialog-control.service';
import { customerTypesOptions } from '../../../../shared/support/enums/customer-types-options';
import { customerEditorFormControls } from './customerEditorFormControls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import finSelectOption from 'src/app/shared/support/classes/fin-select-option';
import Message from 'src/app/shared/support/interfaces/message.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-edtior-dialog',
  templateUrl: './customer-edtior-dialog.component.html',
  styleUrls: ['./customer-edtior-dialog.component.css'],
})
export class CustomerEdtiorDialogComponent {
  public form!: FormGroup;
  public formControls = customerEditorFormControls;
  public selectOptions!: Array<finSelectOption>;
  public customer!: CustomerOutput;
  public label = 'Nova Carteira';

  constructor(
    private customerService: CustomersService,
    private formBuilder: FormBuilder,
    private dialogControlService: DialogControlService,
    private snackBarControlService: SnackBarControlService,
    private dialogRef: MatDialogRef<CustomerEdtiorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    if (data) {
      this.getCustomerById(data);
    }
    this.getSelectOptions();
    this.createForm();
  }
  public submitForm() {
    this.unMaskbalance();

    if (!this.customer) {
      this.customerService.create(this.form.value, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
        this.dialogControlService.closeDialog(this.dialogRef);
      });
    } else {
      this.customerService.update(this.customer.id, this.form.value, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
        this.dialogControlService.closeDialog(this.dialogRef, { updated: true });
      });
    }
  }

  public canSave(): boolean {
    return this.form.valid;
  }
  public closeEditorDialog() {
    this.dialogControlService.closeDialog(this.dialogRef);
  }
  private populateForm() {
    this.form.get(this.formControls.nameFormControl)?.setValue(this.customer.name);
    this.form.get(this.formControls.balance)?.setValue(this.customer.balance);
    this.form.get(this.formControls.type)?.setValue(this.customer.type);
  }
  private createForm() {
    this.form = this.formBuilder.group({});
    this.form.addControl(this.formControls.nameFormControl, this.formBuilder.control(null, Validators.required));
    this.form.addControl(this.formControls.balance, this.formBuilder.control(0, Validators.required));
    this.form.addControl(this.formControls.type, this.formBuilder.control(null, Validators.required));
  }
  private getSelectOptions() {
    this.selectOptions = [
      new finSelectOption({ key: 'Banco', value: customerTypesOptions.Bank }),
      new finSelectOption({ key: 'Poupança', value: customerTypesOptions.Savings }),
      new finSelectOption({ key: 'Investimento', value: customerTypesOptions.Investment }),
      new finSelectOption({ key: 'Dinheiro', value: customerTypesOptions.Money }),
      new finSelectOption({ key: 'Outros', value: customerTypesOptions.Others }),
    ];
  }
  private unMaskbalance(): void {
    let balanceUnMasked: string = this.form.get(this.formControls.balance)?.value;
    if (typeof balanceUnMasked === 'string') {
      balanceUnMasked = balanceUnMasked.replace('R$', '').replace(/\./g, '').replace(',', '.');
      this.form.get(this.formControls.balance)?.setValue(Number(balanceUnMasked));
    }
  }
  private getCustomerById(customerId: string) {
    this.customerService.getById(customerId, (data: ResponseGetByIdCustomerDto) => {
      if (!data.message.error) {
        this.customer = data.customer;
        this.label = 'Editar Carteira';
        this.populateForm();
      }
    });
  }
}
