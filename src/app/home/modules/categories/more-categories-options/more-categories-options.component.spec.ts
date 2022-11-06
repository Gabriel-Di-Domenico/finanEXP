import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCategoriesOptionsComponent } from './more-categories-options.component';

describe('MoreCategoriesOptionsComponent', () => {
  let component: MoreCategoriesOptionsComponent;
  let fixture: ComponentFixture<MoreCategoriesOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreCategoriesOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreCategoriesOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
