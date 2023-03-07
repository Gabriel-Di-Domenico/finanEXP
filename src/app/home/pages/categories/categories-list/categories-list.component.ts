import { Category } from 'src/app/core/models/categories/category';
import { DialogControlService, SnackBarControlService } from 'finan-exp-sdk';
import { GetAllFilter } from './../../../../shared/support/interfaces/getAllFilter';

import { CategoriesEditorDialogComponent } from './../categories-editor-dialog/categories-editor-dialog.component';

import { Subscription } from 'rxjs';
import { transactionTypeChangeHandler } from './../../../../shared/handlers/transactionType/transactionTypeChangeHandler';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CategoriesService } from './../categories.service';
import { TransactionType } from '../../../../shared/support/enums/transactionTypes/transaction-types';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CategoryOutput } from 'src/app/core/dtos/categories/categoryOutput';
import { MatTable } from '@angular/material/table';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { FinConfirmationDialogComponent } from 'finan-exp-sdk';
import { CategoriesEditorDialogData } from '../categories-editor-dialog/categoriesEditorDialogData';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  @Input() public transactionType!: TransactionType;
  @Input() categories!: Array<CategoryOutput>;
  @Input() isArchivedComponent!: boolean;
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
  public openConfirmationDialog(category: Category, isDelete: boolean) {
    this.dialogControlService
      .openDialog(FinConfirmationDialogComponent, {
        width: '400px',
        height: '200px',
        data: { message: isDelete ? 'Uma vez deletada a categoria não poderá ser recuperada' : '' },
      })
      .afterClosed()
      .subscribe({
        next: (data: { confirm: boolean }) => {
          if (data.confirm) {
            if (isDelete) {
              this.deleteCategory(category);
            } else if (this.isArchivedComponent) {
              this.unArchiveCategory(category);
            } else {
              this.archiveCategory(category);
            }
          }
        },
      });
  }
  private getCategories(): void {
    this.categoriesService.getAll(
      { transactionType: this.transactionType, isArchived: this.isArchivedComponent } as GetAllFilter,
      (data: ResponseDto<Array<CategoryOutput>>) => {
        this.categories = data.content;
        this.getDataSource();
      }
    );
  }
  private getDataSource(): void {
    this.dataSource = [];
    this.categories.forEach((category: CategoryOutput) => {
      this.dataSource.push({ id: category.id, name: category.name });
      this.table.renderRows();
    });

    this.loaded = true;
  }
  private deleteCategory(category: CategoryOutput): void {
    this.categoriesService.delete(category.id, (message: Message) => {
      if (!message.error) {
        this.getCategories();
      }
      this.snackBarControlService.showMessage(message.message, message.error);
    });
  }
  private archiveCategory(category: Category): void {
    this.categoriesService.archive(category, (message: Message) => {
      if (!message.error) {
        this.getCategories();
      }
      this.snackBarControlService.showMessage(message.message, message.error);
    });
  }
  private unArchiveCategory(category: Category): void {
    this.categoriesService.unArchive(category, (message: Message) => {
      if (!message.error) {
        this.getCategories();
      }
      this.snackBarControlService.showMessage(message.message, message.error);
    });
  }
}
