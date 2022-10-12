import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-photo',
  templateUrl: './perfil-photo.component.html',
  styleUrls: ['./perfil-photo.component.css']
})
export class PerfilPhotoComponent {

  @Input() perfilPhoto!: string;

}
