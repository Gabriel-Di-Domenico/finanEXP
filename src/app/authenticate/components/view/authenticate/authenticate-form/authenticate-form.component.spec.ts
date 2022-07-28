import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AuthenticateFormComponent } from './authenticate-form.component';

describe('AuthenticateFormComponent', () => {
  let component: AuthenticateFormComponent;
  let fixture: ComponentFixture<AuthenticateFormComponent>;
  let compiled: HTMLElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthenticateFormComponent
      ],
      imports: [
        BrowserAnimationsModule,

        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,

        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthenticateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Have a login/register form', () => {
    const loginRegisterForm = compiled.querySelector('#loginForm') || compiled.querySelector('#registerForm')
    expect(loginRegisterForm).toBeTruthy()
  })
  it("Have a submit Button", () => {
    const submitButton = compiled.querySelector('#submitButton')
    expect(submitButton).toBeTruthy()
  })
});
