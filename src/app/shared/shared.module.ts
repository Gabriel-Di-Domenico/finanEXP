import { MatIconModule } from '@angular/material/icon';
import { PerfilPhotoComponent } from './components/perfilPhoto/perfil-photo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InputsModule } from './components/inputs/inputs.module';
import { ButtonsModule } from './components/buttons/buttons.module';

@NgModule({
  declarations: [PerfilPhotoComponent],
  imports: [
    CommonModule,
    HttpClientModule,

    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports:[PerfilPhotoComponent, InputsModule, ButtonsModule]
})
export class SharedModule { }
