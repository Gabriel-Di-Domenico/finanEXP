import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinInputComponent } from './fin-input.component';

describe('FinInputComponent', () => {
  let component: FinInputComponent;
  let fixture: ComponentFixture<FinInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
