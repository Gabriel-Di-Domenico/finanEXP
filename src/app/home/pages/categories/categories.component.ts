import { DialogControlService } from 'finan-exp-services';
import { ActivatedRoute, Router } from '@angular/router';
import { transactionTypeChangeHandler } from '../../../shared/handlers/transactionType/transactionTypeChangeHandler';
import { TransactionType } from '../../../shared/support/enums/transactionTypes/transaction-types';

import { CategoriesEditorDialogComponent } from './categories-editor-dialog/categories-editor-dialog.component';
import { Component, OnInit } from '@angular/core';
import { TransactionTypePortuguese } from 'src/app/shared/support/enums/transactionTypes/transaction-types-portuguese';
import { take } from 'rxjs';
import { CategoriesEditorDialogData } from './categories-editor-dialog/categoriesEditorDialogData';

@Component({
  selector: 'fin-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public PortugueseTransactionTypeEnum = TransactionTypePortuguese;
  public currentTransactionType = TransactionType.revenue;
  public finAddButtonColor: 'success' | 'warn' = 'success';
  public isArchivedComponent = false;
  constructor(private dialogControl: DialogControlService, private route: ActivatedRoute, private router:Router) {}
  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (data: any) => {
        this.isArchivedComponent = data['isArchivedComponent'];
      },
    });
  }

  public openCategoriesEditorDialog(): void {
    this.dialogControl
      .openDialog(CategoriesEditorDialogComponent, {
        width: '400px',
        height: '220px',
        data: {
          transactionType: this.currentTransactionType,
          operation: 'create',
        } as CategoriesEditorDialogData,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          this.setTransactionType(this.currentTransactionType);
        },
      });
  }
  public setTransactionType(transactionType: TransactionType) {
    if (transactionType === TransactionType.expense) {
      this.finAddButtonColor = 'warn';
    } else {
      this.finAddButtonColor = 'success';
    }
    this.currentTransactionType = transactionType;
    transactionTypeChangeHandler.emit(this.currentTransactionType);
  }
  public openCategoriesComponent(){
    this.router.navigate(['home', 'categories'])
  }
}
