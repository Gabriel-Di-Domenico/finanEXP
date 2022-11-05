import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesEditorDialogComponent } from './categories-editor-dialog.component';

describe('CategoriesEditorDialogComponent', () => {
  let component: CategoriesEditorDialogComponent;
  let fixture: ComponentFixture<CategoriesEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
