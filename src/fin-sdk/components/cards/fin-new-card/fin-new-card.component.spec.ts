import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinNewCardComponent } from './fin-new-card.component';

describe('FinNewCardComponent', () => {
  let component: FinNewCardComponent;
  let fixture: ComponentFixture<FinNewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinNewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
