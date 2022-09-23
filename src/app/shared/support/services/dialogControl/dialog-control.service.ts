import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'any'
})
export class DialogControlService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialog(component: ComponentType<unknown>, configs?: MatDialogConfig<any>) {
    this.dialog.open(component, configs);
  }

}
