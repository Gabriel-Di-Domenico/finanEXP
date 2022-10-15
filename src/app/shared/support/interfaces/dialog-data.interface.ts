import { MatDialogRef } from '@angular/material/dialog';
export interface DialogDataInterface {
  dialog: MatDialogRef<any>
  data?: any;
}