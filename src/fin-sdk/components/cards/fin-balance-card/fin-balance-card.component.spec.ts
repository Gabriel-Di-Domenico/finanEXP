import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinBalanceCardComponent } from './fin-balance-card.component';

describe('FinBalanceCardComponent', () => {
  let component: FinBalanceCardComponent;
  let fixture: ComponentFixture<FinBalanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinBalanceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinBalanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
