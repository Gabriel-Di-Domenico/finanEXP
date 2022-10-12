import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinDeleteButtonComponent } from './fin-delete-button.component';

describe('FinDeleteButtonComponent', () => {
  let component: FinDeleteButtonComponent;
  let fixture: ComponentFixture<FinDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinDeleteButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
