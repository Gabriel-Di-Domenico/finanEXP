import { SnackBarControlService } from './../../../../app/shared/support/services/snackBarControl/snack-bar-control.service';
import { FinConfirmationDialogFormControls } from './finConfirmationDialogFormControls';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogControlService } from './../../../../app/shared/support/services/dialogControl/dialog-control.service';
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinConfirmationDialogData } from './finConfirmationDialogData';

@Component({
  selector: 'fin-confirmation-dialog',
  templateUrl: './fin-confirmation-dialog.component.html',
  styleUrls: ['./fin-confirmation-dialog.component.css'],
})
export class FinConfirmationDialogComponent {
  public message = '';
  public withVerification = false;
  public form!: FormGroup;
  public formControls = FinConfirmationDialogFormControls;
  constructor(
    private dialogRef: MatDialogRef<FinConfirmationDialogComponent>,
    private dialogControlService: DialogControlService,
    @Inject(MAT_DIALOG_DATA) public data: FinConfirmationDialogData,
    private formBuilder: FormBuilder,
    private snackBarControlService: SnackBarControlService
  ) {
    if (data.message) {
      this.message = data.message;
    }
    if (data.withVerification) {
      this.withVerification = data.withVerification;
    }
    if (this.withVerification) {
      this.createForm();
    }
  }

  public confirm(): void {
    this.dialogControlService.closeDialog(this.dialogRef, { confirm: true });
  }
  public cancel(): void {
    this.dialogControlService.closeDialog(this.dialogRef, { confirm: false });
  }
  public submitForm() {
    if (this.form.get(this.formControls.confirmationString)?.value === 'Desejo deletar') {
      this.confirm();
    } else {
      this.snackBarControlService.showMessage('Você digitou incorretamente', true);
      this.cancel();
    }
  }
  private createForm() {
    this.form = this.formBuilder.group({});
    this.form.addControl(this.formControls.confirmationString, this.formBuilder.control(null));
  }
}
