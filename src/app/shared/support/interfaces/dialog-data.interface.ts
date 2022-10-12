import { MatDialogRef } from '@angular/material/dialog';
export default interface DialogDataInterface {
  dialog: MatDialogRef<any>
  data?: any;
};