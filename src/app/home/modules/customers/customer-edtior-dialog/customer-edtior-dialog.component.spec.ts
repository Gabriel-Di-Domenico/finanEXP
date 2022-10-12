import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEdtiorDialogComponent } from './customer-edtior-dialog.component';

describe('CustomerEdtiorDialogComponent', () => {
  let component: CustomerEdtiorDialogComponent;
  let fixture: ComponentFixture<CustomerEdtiorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEdtiorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEdtiorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
