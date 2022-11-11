import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsEditorDialogComponent } from './transactions-editor-dialog.component';

describe('TransactionsEditorDialogComponent', () => {
  let component: TransactionsEditorDialogComponent;
  let fixture: ComponentFixture<TransactionsEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
