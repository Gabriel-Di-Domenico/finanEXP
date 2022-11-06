import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinIconButtonComponent } from './fin-icon-button.component';

describe('FinIconButtonComponent', () => {
  let component: FinIconButtonComponent;
  let fixture: ComponentFixture<FinIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
