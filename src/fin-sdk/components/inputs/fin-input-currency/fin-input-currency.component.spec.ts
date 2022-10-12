import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinInputCurrencyComponent } from './fin-input-currency.component';

describe('FinInputCurrencyComponent', () => {
  let component: FinInputCurrencyComponent;
  let fixture: ComponentFixture<FinInputCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinInputCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinInputCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
