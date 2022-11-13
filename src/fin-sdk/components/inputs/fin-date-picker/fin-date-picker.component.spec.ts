import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinDatePickerComponent } from './fin-date-picker.component';

describe('FinDatePickerComponent', () => {
  let component: FinDatePickerComponent;
  let fixture: ComponentFixture<FinDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
