import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'any',
})
export class DialogControlService {
  dialogRef!: MatDialogRef<unknown>;
  constructor(private dialog: MatDialog) {}

  openDialog(component: ComponentType<unknown>, configs?: MatDialogConfig) {
    return (this.dialogRef = this.dialog.open(component, {
      ...configs,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    }));
  }
  closeDialog(dialog:MatDialogRef<unknown>, closeData?:any) {
    dialog.close(closeData);
  }
}
