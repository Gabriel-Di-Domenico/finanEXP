import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCustomersOptionsComponent } from './more-customers-options.component';

describe('MoreCustomersOptionsComponent', () => {
  let component: MoreCustomersOptionsComponent;
  let fixture: ComponentFixture<MoreCustomersOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreCustomersOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreCustomersOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
