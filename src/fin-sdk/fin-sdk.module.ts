import { CardsModule } from './components/cards/cards.module';
import { PipesModule } from './pipes/pipes.module';
import { SelectModule } from './components/select/select.module';
import { InputsModule } from './components/inputs/inputs.module';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { FinCommonModule } from './components/common/fin-common.module';
import { ButtonsModule } from './components/buttons/buttons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilPhotoComponent } from './components/perfilPhoto/perfil-photo.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PerfilPhotoComponent],
  imports: [CommonModule, HttpClientModule, MatSnackBarModule, MatDialogModule, MatIconModule, PipesModule],
  exports: [ButtonsModule, FinCommonModule, DialogsModule, InputsModule, PerfilPhotoComponent, SelectModule, PipesModule, CardsModule],
})
export class FinSDKModule {}
