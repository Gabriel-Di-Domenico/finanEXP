import { AuthenticateService } from './../../../../services/authenticate-service/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
    private authenticateService: AuthenticateService
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
      password: [null, Validators.required]
    })
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    })
    this.actualForm = this.loginForm
    this.notActualForm = this.registerForm
  }

  showMessage(message: string, error: boolean) {
    this.openSnackBar(message, error)
  }
  showError() {
    Object.keys(this.actualForm.controls).forEach((control) => {
      const formControl = this.actualForm.controls[control]
      if (formControl.status === 'INVALID') {
        switch (control) {
          case 'name': {
            this.showMessage('Nome inválido !', true)
          } break
          case 'email': {
            this.showMessage('Email inválido !', true)
          } break
          case 'password': {
            this.showMessage('Senha inválida !', true)
          }
        }
      }
    })
  }
  submitRegisterForm() {
    if (this.actualForm.status === 'VALID') {
      this.authenticateService.registerNewUser(this.registerForm.value).subscribe(data => {
        this.showMessage(data.message, false)
      }, err => {
        this.showMessage(err.error.message, true)
      })
    } else {
      this.showError()
    }
  }
  submitLoginForm() {
    if (this.actualForm.status === 'VALID') {
      this.authenticateService.authUser(this.loginForm.value, 
        (obj: { message: string, error: boolean }) => {
        this.showMessage(obj.message, obj.error)
      })
    } else {
      this.showError()
    }
  }
  openSnackBar(message: string, error: boolean) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(message, '', {
      panelClass: [error ? 'message-error' : 'message-successful'],
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 2000
    });
  }
}
