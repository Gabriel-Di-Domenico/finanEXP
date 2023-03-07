import { SnackBarControlService, DialogControlService } from 'finan-exp-sdk';
import { CategoryOutput } from 'src/app/core/dtos/categories/categoryOutput';

import { CategoriesService } from './../categories.service';
import { CategoriesEditorDialogData } from './categoriesEditorDialogData';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Component, Inject, Input } from '@angular/core';
import { categoriesEditorFormControls } from './categoriesEditorFormControls';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';

@Component({
  selector: 'fin-categories-editor-dialog',
  templateUrl: './categories-editor-dialog.component.html',
  styleUrls: ['./categories-editor-dialog.component.css']
})
export class CategoriesEditorDialogComponent {
  @Input() label = 'Nova Categoria';
  public form!:FormGroup;
  public formControls = categoriesEditorFormControls
  private category!:CategoryOutput
  constructor(
    private dialogControlService:DialogControlService,
    private dialogRef:MatDialogRef<CategoriesEditorDialogComponent>,
    private formBuilder:FormBuilder,
    private categoriesService:CategoriesService,
    private snackBarControlService:SnackBarControlService,
    @Inject(MAT_DIALOG_DATA) private data: CategoriesEditorDialogData,
  ) {
    if (this.data.operation === 'update') {
      this.getCategoryById();
    }
    this.createForm();
  }

  public closeEditorDialog() {
    this.dialogControlService.closeDialog(this.dialogRef);
  }
  public submitForm(){
    this.form.get(this.formControls.transactionType)?.setValue(this.data.transactionType)
    if (this.data.operation === 'create') {
      this.categoriesService.create(this.form.value, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
        this.dialogControlService.closeDialog(this.dialogRef);
      });
    } else {
      this.categoriesService.update(this.category.id, this.form.value, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
        this.dialogControlService.closeDialog(this.dialogRef, { updated: true });
      });
    }
  }
  public canSave():boolean{
    return this.form.valid && this.form.touched;
  }
  private createForm() {
    this.form = this.formBuilder.group({});
    this.form.addControl(this.formControls.nameFormControl, this.formBuilder.control(null, [Validators.required]))
    this.form.addControl(this.formControls.transactionType, this.formBuilder.control(0, [Validators.required]))
  }
  private getCategoryById(){
    this.categoriesService.getById(this.data.categoryId, (data: ResponseDto<CategoryOutput>) => {
      if (!data.message.error) {
        this.category = data.content;
        this.label = 'Editar Carteira';
        this.populateForm();
      }
    });
  }
  private populateForm() {
    this.form.get(this.formControls.nameFormControl)?.setValue(this.category.name);
    this.form.get(this.formControls.transactionType)?.setValue(this.category.transactionType);
  }
}
