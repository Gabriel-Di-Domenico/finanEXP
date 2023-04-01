import { FinValidatorsService, SnackBarControlService } from 'finan-exp-sdk';

import { loginFormControls } from './loginFormControls';
import { registerFormControls } from './registerFormControls';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { AuthenticateService } from './../../services/authenticate-service/authenticate.service';

import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { UserInput } from 'src/app/core/dtos/user/userInput';
@Component({
  selector: 'app-authenticate-form',
  templateUrl: './authenticate-form.component.html',
  styleUrls: ['./styles/authenticate-form.component.css'],
})
export class AuthenticateFormComponent implements OnInit {
  public showPassword = false;
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public registerFormControls = registerFormControls;
  public loginFormControls = loginFormControls;
  private actualForm!: FormGroup;
  private notActualForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private snackBarControlService: SnackBarControlService,
    private finValidatorsService: FinValidatorsService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
    this.actualForm = this.loginForm;
    this.notActualForm = this.registerForm;
  }

  public changeForm(actualMatTab: MatTabChangeEvent) {
    if (actualMatTab.index === 0) {
      this.actualForm = this.loginForm;
      this.notActualForm = this.registerForm;
    } else {
      this.actualForm = this.registerForm;
      this.notActualForm = this.loginForm;
    }

    const name = this.notActualForm.value.name;
    const email = this.notActualForm.value.email;
    const password = this.notActualForm.value.password;

    this.actualForm.patchValue({
      name,
      email,
      password,
    });
    this.actualForm.enable();
    this.notActualForm.disable();
  }
  public canSave(): boolean {
    return this.actualForm.valid && this.actualForm.dirty;
  }
  public submitRegisterForm() {
    if (this.canSave()) {
      const password = this.registerForm.get(registerFormControls.password)?.value;
      const confirmPassword = this.registerForm.get(registerFormControls.confirmationPassword)?.value;
      if (this.verifyPasswords(password, confirmPassword)) {
        const userValues: UserInput = this.registerForm.value;

        this.authenticateService.createNewUser(userValues, (message: Message) => {
          this.actualForm.reset();
          this.snackBarControlService.showMessage(message.message, message.error);
        });
      } else {
        this.snackBarControlService.showMessage('As senhas não correspondem', true);
      }
    }
  }

  public submitLoginForm() {
    if (this.canSave()) {
      const userValues: UserInput = this.loginForm.value;
      this.authenticateService.authUser(userValues, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);

        this.actualForm.reset();
      });
    }
  }

  private verifyPasswords(newPassword: string, confirmPassword: string): boolean {
    return newPassword === confirmPassword;
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({});
    this.loginForm.addControl(
      this.loginFormControls.email,
      this.formBuilder.control(null, [Validators.email, Validators.required])
    );
    this.loginForm.addControl(this.loginFormControls.password, this.formBuilder.control(null, [Validators.required]));
  }
  private createRegisterForm() {
    this.registerForm = this.formBuilder.group({});

    this.registerForm.addControl(
      this.registerFormControls.nameFormControl,
      this.formBuilder.control(null, [
        Validators.required,
        Validators.maxLength(25),
        this.finValidatorsService.trimValidator,
      ])
    );
    this.registerForm.addControl(
      this.registerFormControls.email,
      this.formBuilder.control(null, [Validators.email, Validators.required])
    );
    this.registerForm.addControl(
      this.registerFormControls.password,
      this.formBuilder.control(null, [
        Validators.required,
        Validators.max(30),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/),
      ])
    );
    this.registerForm.addControl(
      this.registerFormControls.confirmationPassword,
      this.formBuilder.control(null, [Validators.required])
    );
  }
}
