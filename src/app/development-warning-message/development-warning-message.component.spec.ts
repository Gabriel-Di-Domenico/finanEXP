import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentWarningMessageComponent } from './development-warning-message.component';

describe('DevelopmentWarningMessageComponent', () => {
  let component: DevelopmentWarningMessageComponent;
  let fixture: ComponentFixture<DevelopmentWarningMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentWarningMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentWarningMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
