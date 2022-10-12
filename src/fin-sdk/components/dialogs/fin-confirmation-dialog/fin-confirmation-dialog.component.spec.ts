import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinConfirmationDialogComponent } from './fin-confirmation-dialog.component';

describe('FinConfirmationDialogComponent', () => {
  let component: FinConfirmationDialogComponent;
  let fixture: ComponentFixture<FinConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
