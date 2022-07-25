import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AuthenticateComponent } from './authenticate.component';
import { AuthenticateFormComponent } from './authenticate-form/authenticate-form.component';

describe('authenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;
  let compiled: HTMLElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticateComponent,AuthenticateFormComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatIconModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Have a authenticate IMG', () => {
    const authenticateIMG = compiled.querySelector('#authenticateIMG')
    expect(authenticateIMG).toBeTruthy()
  })
  it('Have a atuhenticateForm', () => {
    const atuhenticateForm = compiled.querySelector('#authenticateForm')
    expect(atuhenticateForm).toBeTruthy()
  })
});
