import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSelectComponent } from './fin-select.component';

describe('FinSelectComponent', () => {
  let component: FinSelectComponent;
  let fixture: ComponentFixture<FinSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
