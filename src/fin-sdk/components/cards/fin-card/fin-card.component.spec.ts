import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinCardComponent } from './fin-card.component';

describe('FinCardComponent', () => {
  let component: FinCardComponent;
  let fixture: ComponentFixture<FinCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
