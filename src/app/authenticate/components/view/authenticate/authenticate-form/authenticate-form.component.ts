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
  actualForm: String = 'loginForm'
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {

  }
  changeForm(actualMatTab: MatTabChangeEvent) {
    actualMatTab.index === 0 ? this.actualForm = 'loginForm' : this.actualForm = 'registerForm'
    if (this.actualForm === 'loginForm') {
      this.loginForm.reset()

      this.loginForm.patchValue({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      })

      this.loginForm.enable()
      this.registerForm.disable()
    } else {
      this.registerForm.reset()

      this.registerForm.patchValue({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })

      this.loginForm.disable()
      this.registerForm.enable()
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    })
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      name: [null, Validators.required]
    })
  }

  switchForm(type: 'valid' | 'emailError' | 'passwordError' | 'nameError') {
    switch (type) {
      case 'valid': {
        this.openSnackBar('Deu certo', false)
      } break
      case 'emailError': {
        this.openSnackBar('Email inválido', true)
      } break
      case 'passwordError': {
        this.openSnackBar('Senha inválida', true)
      } break
      case 'nameError': {
        this.openSnackBar('Nome inválido', true)
      }
    }
  }
  onSubmit() {
    if (this.actualForm === 'loginForm' && this.loginForm.status === 'VALID') {
      this.switchForm('valid')

    } else if (this.actualForm === 'registerForm' && this.registerForm.status === 'VALID') {
      this.switchForm('valid')
    } else if (this.loginForm.controls['email'].status === 'INVALID' || this.registerForm.controls['email'].status === 'INVALID') {
      this.switchForm('emailError')
    } else if (this.loginForm.controls['password'].status === 'INVALID' || this.registerForm.controls['password'].status === 'INVALID') {
      this.switchForm('passwordError')
    } else if (this.registerForm.controls['name'].status === 'INVALID') {
      this.switchForm('nameError')
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
