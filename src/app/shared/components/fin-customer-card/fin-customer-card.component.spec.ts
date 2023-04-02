import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinCustomerCardComponent } from './fin-customer-card.component';

describe('FinCustomerCardComponent', () => {
  let component: FinCustomerCardComponent;
  let fixture: ComponentFixture<FinCustomerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinCustomerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinCustomerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
