import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinAddButtonComponent } from './fin-add-button.component';

describe('FinAddButtonComponent', () => {
  let component: FinAddButtonComponent;
  let fixture: ComponentFixture<FinAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinAddButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
