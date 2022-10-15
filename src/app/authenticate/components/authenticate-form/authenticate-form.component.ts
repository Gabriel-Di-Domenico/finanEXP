import { loginFormControls } from './loginFormControls';
import { registerFormControls } from './registerFormControls';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { AuthenticateService } from './../../services/authenticate-service/authenticate.service';

import { SnackBarControlService } from '../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { UserInput } from 'src/app/shared/support/interfaces/user/userInput.interface';

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
    private snackBarControlService: SnackBarControlService
  ) {}

  ngOnInit(): void {
    this.createForms();
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
    return this.actualForm.valid;
  }
  public submitRegisterForm() {
    if (this.canSave()) {
      const userValues: UserInput = this.registerForm.value;

      this.authenticateService.createNewUser(userValues, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
      });
    }
  }

  public submitLoginForm() {
    if (this.canSave()) {
      const userValues: UserInput = this.loginForm.value;

      this.authenticateService.authUser(userValues, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
      });
    }
  }

  private createForms() {
    this.loginForm = this.formBuilder.group({
      [this.loginFormControls.email]: [null, [Validators.email, Validators.required]],
      [this.loginFormControls.password]: [null, [Validators.required]],
    });
    this.registerForm = this.formBuilder.group({
      [this.registerFormControls.nameFormControl]: [null, [Validators.required, Validators.maxLength(25)]],
      [this.registerFormControls.email]: [null, [Validators.email, Validators.required]],
      [this.registerFormControls.password]: [
        null,
        [
          Validators.required,
          Validators.max(30),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/),
        ],
      ],
    });
    this.actualForm = this.loginForm;
    this.notActualForm = this.registerForm;
  }
}
