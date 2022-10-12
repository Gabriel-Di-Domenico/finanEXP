import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinEditButtonComponent } from './fin-edit-button.component';

describe('FinEditButtonComponent', () => {
  let component: FinEditButtonComponent;
  let fixture: ComponentFixture<FinEditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinEditButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
