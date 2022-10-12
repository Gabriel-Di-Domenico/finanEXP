import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSubtitleComponent } from './fin-subtitle.component';

describe('FinSubtitleComponent', () => {
  let component: FinSubtitleComponent;
  let fixture: ComponentFixture<FinSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinSubtitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
