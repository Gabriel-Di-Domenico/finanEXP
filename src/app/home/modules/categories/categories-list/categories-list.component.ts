import { SnackBarControlService } from './../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { CategoriesEditorDialogData } from 'src/app/shared/support/interfaces/categories/categoriesEditorDialogData';
import { CategoriesEditorDialogComponent } from './../categories-editor-dialog/categories-editor-dialog.component';
import { DialogControlService } from './../../../../shared/support/services/dialogControl/dialog-control.service';
import { Subscription } from 'rxjs';
import { transactionTypeChangeHandler } from './../../../../shared/handlers/transactionType/transactionTypeChangeHandler';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CategoriesService } from './../categories.service';
import { TransactionType } from '../../../../shared/support/enums/transactionTypes/transaction-types';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CategoryOutput } from 'src/app/shared/support/interfaces/categories/categoryOutput';
import { MatTable } from '@angular/material/table';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { FinConfirmationDialogComponent } from 'src/fin-sdk/components/dialogs/fin-confirmation-dialog/fin-confirmation-dialog.component';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  @Input() public transactionType!: TransactionType;
  @Input() categories!: Array<CategoryOutput>;
  @ViewChild(MatTable) table!: MatTable<{ name: string }>;

  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource: Array<{ id: string; name: string }> = [];
  public loaded = false;

  private transactionTypeChangesubscription!: Subscription;
  constructor(
    private categoriesService: CategoriesService,
    private dialogControlService: DialogControlService,
    private snackBarControlService: SnackBarControlService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.transactionTypeChangesubscription = transactionTypeChangeHandler.subscribe((transactionType: TransactionType) => {
      this.transactionType = transactionType;
      this.getCategories();
    });
  }
  ngOnDestroy(): void {
    this.transactionTypeChangesubscription.unsubscribe();
  }
  public openCategoriesEditorDialog(categoryId: string): void {
    this.dialogControlService
      .openDialog(CategoriesEditorDialogComponent, {
        width: '400px',
        height: '220px',
        data: {
          operation: 'update',
          transactionType: this.transactionType,
          categoryId,
        } as CategoriesEditorDialogData,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          this.getCategories();
        },
      });
  }
  public openConfirmationDeleteCustomerDialog(categoryId:string) {
    this.dialogControlService
      .openDialog(FinConfirmationDialogComponent, {
        width: '400px',
        height: '200px',
        data: { message: 'Uma vez deletada a categoria não poderá ser recuperada' },
      })
      .afterClosed()
      .subscribe({
        next: (data: { confirm: boolean }) => {
          if (data.confirm) {
            this.categoriesService.delete(categoryId, (message: Message) => {
              if(!message.error){
                this.getCategories();
              }
              this.snackBarControlService.showMessage(message.message, message.error);
            });
          }
        },
      });
  }
  private getCategories(): void {
    this.categoriesService.getAll(this.transactionType, (data: ResponseDto<Array<CategoryOutput>>) => {
      this.categories = data.content;
      this.getDataSource();
    });
  }
  private getDataSource(): void {
    this.dataSource = [];
    this.categories.forEach((category: CategoryOutput) => {
      this.dataSource.push({ id: category.id, name: category.name });
      this.table.renderRows();
    });

    this.loaded = true;
  }
}
