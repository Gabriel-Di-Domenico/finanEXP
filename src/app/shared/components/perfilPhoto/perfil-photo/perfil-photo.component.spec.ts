import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPhotoComponent } from './perfil-photo.component';

describe('PerfilPhotoComponent', () => {
  let component: PerfilPhotoComponent;
  let fixture: ComponentFixture<PerfilPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
