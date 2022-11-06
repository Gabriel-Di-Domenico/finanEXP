import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { TransactionMenuComponent } from './transaction-menu/transaction-menu.component';
import { CategoriesEditorDialogComponent } from './categories-editor-dialog/categories-editor-dialog.component';
import { MoreCategoriesOptionsComponent } from './more-categories-options/more-categories-options.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
    TransactionMenuComponent,
    CategoriesEditorDialogComponent,
    MoreCategoriesOptionsComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class CategoriesModule { }
