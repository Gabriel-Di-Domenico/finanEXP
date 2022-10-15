import { DialogControlService } from './../../../../app/shared/support/services/dialogControl/dialog-control.service';
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fin-confirmation-dialog',
  templateUrl: './fin-confirmation-dialog.component.html',
  styleUrls: ['./fin-confirmation-dialog.component.css'],
})
export class FinConfirmationDialogComponent {
  public message = '';

  constructor(
    private dialogRef: MatDialogRef<FinConfirmationDialogComponent>,
    private dialogControlService: DialogControlService,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    if (data.message) {
      this.message = data.message;
    }
  }
  confirm(): void {
    this.dialogControlService.closeDialog(this.dialogRef, { confirm: true });
  }
  cancel(): void {
    this.dialogControlService.closeDialog(this.dialogRef, { confirm: false });
  }
}
