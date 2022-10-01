import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { AuthenticateService } from './../../services/authenticate-service/authenticate.service';
import Errors from '../../../shared/support/enums/Errors';
import UserInput from '../../../shared/support/interfaces/userInput.interface';
import { SnackBarControlService } from '../../../shared/support/services/snackBarControl/snack-bar-control.service';
import Message from 'src/app/shared/support/interfaces/message.interface';

@Component({
  selector: 'app-authenticate-form',
  templateUrl: './authenticate-form.component.html',
  styleUrls: ['./styles/authenticate-form.component.css']
})

export class AuthenticateFormComponent implements OnInit {
  showPassword = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  actualForm!: FormGroup;
  notActualForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private snackBarControlService: SnackBarControlService
  ) { }

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
      password
    });
    this.actualForm.enable();
    this.notActualForm.disable();
  }
  public canSave():boolean{
    return this.actualForm.valid;
  }
  public submitRegisterForm() {
    if(this.canSave()){
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
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.max(30), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]]
    });
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.max(30), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]]
    });
    this.actualForm = this.loginForm;
    this.notActualForm = this.registerForm;
  }

}
