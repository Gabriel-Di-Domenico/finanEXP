import { SnackBarControlService } from '../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { AuthenticateService } from './../../../services/authenticate-service/authenticate.service';
import Errors from '../../../../shared/support/enums/Errors';
import UserInput from '../../../../shared/support/interfaces/userInput.interface';

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
    private authenticateService: AuthenticateService,
    private snackBarControlService: SnackBarControlService
  ) { }

  ngOnInit(): void {
    this.createForms()
  }

  public changeForm(actualMatTab: MatTabChangeEvent) {
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

  public submitRegisterForm() {
    if (this.actualForm.status === 'VALID') {
      
      const userValues: UserInput = this.registerForm.value

      this.authenticateService.createNewUser(userValues, (error?: HttpErrorResponse) => {
        if (!error) {
          this.snackBarControlService.showMessage("Usuário criado com sucesso", false)
        } else {
          if (error.error === Errors[0]) {
            this.snackBarControlService.showMessage("Usuário já registrado", true)
          } else {
            this.snackBarControlService.showMessage("Erro ao registrar usuário", true)
          }
        }
      })
    } else {
      this.showError()
    }
  }

  public submitLoginForm() {
    if (this.actualForm.status === 'VALID') {

      const userValues: UserInput = this.loginForm.value

      this.authenticateService.authUser(userValues, (error?: HttpErrorResponse) => {
        if (!error) {
          this.snackBarControlService.showMessage("Usuário autenticado", false)
        } else {
          this.snackBarControlService.showMessage("Usuário não autenticado, verifique os dados", true)
        }
      })

    }
  }

  private createForms() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.max(30), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]]
    })
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.max(30), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]]
    })
    this.actualForm = this.loginForm
    this.notActualForm = this.registerForm
  }

  private showError() {
    Object.keys(this.actualForm.controls).forEach((control: string) => {
      const formControl: AbstractControl<any> = this.actualForm.controls[control]

      if (formControl.status === 'INVALID') {
        switch (control) {
          case 'name': {
            this.snackBarControlService.showMessage('Nome inválido', true)
          } break
          case 'email': {
            this.snackBarControlService.showMessage('Email inválido', true)
          } break
          case 'password': {

            if (this.actualForm === this.loginForm) {
              this.snackBarControlService.showMessage('Senha inválida', true)
            } else {
              this.snackBarControlService.showMessage('A senha deve possuir: mínimo de 8 caracteres, um caractere especial,um número, uma letra maiúscula e uma letra minúscula', true)
            }
          }
        }
      }
    })
  }

}
