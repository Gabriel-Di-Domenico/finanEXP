import { TransactionsEditorDialogData } from './../../../shared/support/interfaces/transactions/TransactionsEditorDialogData';
import { TransactionsEditorDialogComponent } from './../transactions-editor-dialog/transactions-editor-dialog.component';
import { DialogControlService } from './../../../shared/support/services/dialogControl/dialog-control.service';
import { TransactionType } from './../../../shared/support/enums/transactionTypes/transaction-types';
import { CommonService } from './../../../shared/support/services/common.service';
import { Component, Input } from '@angular/core';
import { UserOutput } from 'src/app/shared/support/interfaces/user/userOutput.interface';
import { MenuPositionX, MenuPositionY } from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./styles/menu.component.css'],
})
export class MenuComponent {
  @Input() currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  };
  @Input() smallScreen = false;
  public menuPositionX: MenuPositionX = 'before';
  constructor(private commonService: CommonService, private dialogControlService: DialogControlService) {}

  public logout(): void {
    this.commonService.logout();
  }

  public openTransactionEditorModal(transactionType: TransactionType): void {
    this.dialogControlService
      .openDialog(TransactionsEditorDialogComponent, {
        width: '400px',
        height: '220px',
        data: {
          transactionType: transactionType,
          operation: 'create',
        } as TransactionsEditorDialogData,
      })
  }
}
