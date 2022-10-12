import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinTitleComponent } from './fin-title.component';

describe('FinTitleComponent', () => {
  let component: FinTitleComponent;
  let fixture: ComponentFixture<FinTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
