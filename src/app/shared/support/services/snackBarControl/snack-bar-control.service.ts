import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { ISnackBarControlService } from './ISnack-bar-control.service.interface';

@Injectable({
  providedIn: 'any'
})
export class SnackBarControlService implements ISnackBarControlService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  public showMessage(message: string, error: boolean) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(`${message} !`, '', {
      panelClass: [error ? 'message-error' : 'message-successful'],
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 5000
    });
  }

}
