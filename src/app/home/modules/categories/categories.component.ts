import { transactionTypeChangeHandler } from '../../../shared/handlers/transactionType/transactionTypeChangeHandler';
import { TransactionType } from '../../../shared/support/enums/transactionTypes/transaction-types';
import { DialogControlService } from './../../../shared/support/services/dialogControl/dialog-control.service';
import { CategoriesEditorDialogComponent } from './categories-editor-dialog/categories-editor-dialog.component';
import { Component } from '@angular/core';
import { CategoriesEditorDialogData } from 'src/app/shared/support/interfaces/categories/categoriesEditorDialogData';
import { TransactionTypePortuguese } from 'src/app/shared/support/enums/transactionTypes/transaction-types-portuguese';

@Component({
  selector: 'fin-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  public PortugueseTransactionTypeEnum = TransactionTypePortuguese
  public currentTransactionType = TransactionType.revenue
  public finAddButtonColor: 'success' | 'warn' = 'success'
  constructor(
    private dialogControl: DialogControlService
  ) { }

  public openCategoriesEditorDialog(): void {
    this.dialogControl.openDialog(CategoriesEditorDialogComponent, {
      width: '400px',
      height: '220px',
      data: {
        transactionType:this.currentTransactionType,
        operation:'create'
      } as CategoriesEditorDialogData
    }).afterClosed().subscribe({
      next:() => {
        this.setTransactionType(this.currentTransactionType)
      }
    });
  }
  public setTransactionType(transactionType:TransactionType){
    if(transactionType === TransactionType.expense){
      this.finAddButtonColor = 'warn'
    }else{
      this.finAddButtonColor = 'success'
    }
    this.currentTransactionType = transactionType
    transactionTypeChangeHandler.emit(this.currentTransactionType)
  }

}
