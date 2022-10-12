import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinCloseButtonComponent } from './fin-close-button.component';

describe('FinCloseButtonComponent', () => {
  let component: FinCloseButtonComponent;
  let fixture: ComponentFixture<FinCloseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinCloseButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinCloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
