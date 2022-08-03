import { AuthenticateService } from './../../../../services/authenticate-service/authenticate.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AuthenticateFormComponent } from './authenticate-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthenticateFormComponent', () => {
  let component: AuthenticateFormComponent;
  let fixture: ComponentFixture<AuthenticateFormComponent>;
  let compiled: HTMLElement
  let service: AuthenticateService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthenticateFormComponent
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,

        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatSnackBarModule,

        RouterTestingModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthenticateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement
    service = TestBed.inject(AuthenticateService)
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
  it('Forms invalid when empty', () => {
    const loginForm = component.loginForm
    const registerForm = component.registerForm
    expect(loginForm.valid).toBeFalsy()
    expect(registerForm.valid).toBeFalsy()
  })
  it('Input email validity', () => {
    function validateEmail(email: any) {

      expect(email.valid).toBeFalsy()

      let errors: any = {}
      errors = email.errors || {}
      expect(errors['required']).toBeTruthy()

      email.setValue("test")
      errors = email.errors || {}
      expect(errors['email']).toBeTruthy()

      email.setValue('test@test.com')
      expect(email.valid).toBeTruthy()
    }
    const loginEmail = component.loginForm.controls['email']
    const registerEmail = component.registerForm.controls['email']
    validateEmail(loginEmail)
    validateEmail(registerEmail)
  })
  it("Input password validity", () => {
    function validatePassword(password: any) {
      expect(password.valid).toBeFalsy()

      let errors: any = {}
      errors = password.errors || {}

      expect(errors['required']).toBeTruthy()
      password.setValue('123456')
      expect(password.valid).toBeTruthy()
    }
    const loginPassword = component.loginForm.controls['password']
    const registerPassword = component.registerForm.controls['password']
    validatePassword(loginPassword)
    validatePassword(registerPassword)
  })
  it('Name form validity', () => {
    const name = component.registerForm.controls['name']

    expect(name.valid).toBeFalsy()

    let errors: any = {}
    errors = name.errors || {}
    expect(errors['required']).toBeTruthy()
    name.setValue('Test')
    expect(name.valid).toBeTruthy()
  })
  it('Login Form submit, authorizes the user ', () => {
    const loginForm = component.loginForm
    expect(loginForm.valid).toBeFalsy()
    loginForm.patchValue({
      email: 'test@test.com',
      password: '123456'
    })
    expect(loginForm.valid).toBeTruthy()


  })
  it('Register form submit, register a new user', () => {
    const registerForm = component.registerForm
    expect(registerForm.valid).toBeFalsy()
    registerForm.patchValue({
      name: 'test',
      email: 'test@test.com',
      password: 123456
    })
    expect(registerForm.valid).toBeTruthy()

    /* const users = service.getUsers()

    const testUser = {
      createdAt: '2022-08-03 02:34:29',
      id: 1,
      name: 'Test User',
      email: 'IamATestUser@Test.com',
      password: 123456,
      updatedAt: '2022-08-03 02:34:29'
    }
    expect(users).toBe(testUser) */


  })
});
