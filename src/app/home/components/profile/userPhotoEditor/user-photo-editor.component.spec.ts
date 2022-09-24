import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhotoEditorComponent } from './user-photo-editor.component';

describe('UserPhotoEditorComponent', () => {
  let component: UserPhotoEditorComponent;
  let fixture: ComponentFixture<UserPhotoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPhotoEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
