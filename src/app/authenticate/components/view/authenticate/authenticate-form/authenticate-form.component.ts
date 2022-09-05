import { AuthenticateService } from './../../../../services/authenticate-service/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import Errors from '../../../../../support/enums/Errors';
import { UserInput } from '../../../../../support/interfaces/userInput.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authenticate-form',
  templateUrl: './authenticate-form.component.html',
  styleUrls: ['./styles/authenticate-form.component.css']
})
export class AuthenticateFormComponent implements OnInit {
  showPassword: boolean = false
  loginForm!: FormGroup
  registerForm!: FormGroup
  actualForm!: FormGroup
  notActualForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authenticateService: AuthenticateService,
  ) {

  }

  changeForm(actualMatTab: MatTabChangeEvent) {
    if (actualMatTab.index === 0) {
      this.actualForm = this.loginForm
      this.notActualForm = this.registerForm
    } else {
      this.actualForm = this.registerForm
      this.notActualForm = this.loginForm
    }

    const name = this.notActualForm.value.name
    const email = this.notActualForm.value.email
    const password = this.notActualForm.value.password

    this.actualForm.patchValue({
      name,
      email,
      password
    })
    this.actualForm.enable()
    this.notActualForm.disable()
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.max(30), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]]
    })
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required,Validators.maxLength(25)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.max(30), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]]
    })
    this.actualForm = this.loginForm
    this.notActualForm = this.registerForm
  }
  showMessage(message: string, error: boolean) {
    this.openSnackBar(`${message} !`, error)
  }

  showError() {
    Object.keys(this.actualForm.controls).forEach((control: string) => {
      const formControl: AbstractControl<any> = this.actualForm.controls[control]

      if (formControl.status === 'INVALID') {
        switch (control) {
          case 'name': {
            this.showMessage('Nome inválido', true)
          } break
          case 'email': {
            this.showMessage('Email inválido', true)
          } break
          case 'password': {

            if (this.actualForm === this.loginForm) {
              this.showMessage('Senha inválida', true)
            } else {
              this.showMessage('A senha deve possuir: mínimo de 8 caracteres, um caractere especial,um número, uma letra maiúscula e uma letra minúscula', true)
            }
          }
        }
      }
    })
  }
  submitRegisterForm() {
    if (this.actualForm.status === 'VALID') {
      const userValues: UserInput = this.registerForm.value
      console.log(userValues)
      this.authenticateService.registerNewUser(userValues, (error?: HttpErrorResponse) => {
        if (!error) {
          this.showMessage("Usuário criado com sucesso", false)
        } else {
          if (error.error === Errors[0]) {
            this.showMessage("Usuário já registrado", true)
          } else {
            this.showMessage("Erro ao registrar usuário", true)
          }
        }
      })
    } else {
      this.showError()
    }
  }
  submitLoginForm() {
    if (this.actualForm.status === 'VALID') {
      const userValues: UserInput = this.loginForm.value

      this.authenticateService.authUser(userValues, (error?: boolean) => {
        if (!error) {
          this.showMessage("Usuário autenticado", false)
        } else {
          this.showMessage("Usuário não autenticado, verifique os dados", true)
        }
      })

    }
  }
  openSnackBar(message: string, error: boolean) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(message, '', {
      panelClass: [error ? 'message-error' : 'message-successful'],
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 5000
    });
  }
}
