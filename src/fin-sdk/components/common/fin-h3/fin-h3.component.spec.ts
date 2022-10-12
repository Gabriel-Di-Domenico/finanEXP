import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinH3Component } from './fin-h3.component';

describe('FinH3Component', () => {
  let component: FinH3Component;
  let fixture: ComponentFixture<FinH3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinH3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinH3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
