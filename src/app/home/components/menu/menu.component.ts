import { CommonService, DialogControlService } from 'finan-exp-sdk';

import { TransactionType } from './../../../shared/support/enums/transactionTypes/transaction-types';

import { Component, Input } from '@angular/core';
import { MenuPositionX } from '@angular/material/menu';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';
import { TransactionsEditorDialogComponent } from '../../pages/transactions/transactions-editor-dialog/transactions-editor-dialog.component';
import { TransactionsEditorDialogData } from '../../pages/transactions/transactions-editor-dialog/TransactionsEditorDialogData';

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
        height: '570px',
        data: {
          transactionType: transactionType,
          operation: 'create',
        } as TransactionsEditorDialogData,
      })
  }
}
