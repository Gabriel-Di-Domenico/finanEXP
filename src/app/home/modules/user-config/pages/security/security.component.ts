import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from './security.service';
import { SnackBarControlService } from './../../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import UserPasswordDto from 'src/app/shared/support/interfaces/userPasswordDto.interface';
import Message from 'src/app/shared/support/interfaces/message.interface';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  host: {
    class: "h-100 w-100"
  }
})
export class SecurityComponent implements OnInit {
  private currentUserId: string = ''
  public form!: FormGroup
  public showNewPassword: boolean = false
  public showActualPassword: boolean = false
  public showConfirmPassword: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBarControlService: SnackBarControlService,
    private securityService: SecurityService
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data) => {
          this.currentUserId = data['currentUserId']
        }
      })
    this.initForm()
  }
  public canSave(): boolean {
    return this.form.valid
  }

  public saveChanges(): void {
    const actualPassword = this.form.get('actualPassword')?.value
    const newPassword = this.form.get('newPassword')?.value
    const confirmPassword = this.form.get('confirmPassword')?.value
    
    if (this.verifyPasswords(newPassword, confirmPassword)) {
      const passwordConfigs: UserPasswordDto = {
        actualPassword,
        newPassword
      }
      this.securityService.updateUserPassword(this.currentUserId, passwordConfigs, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error)
      })
    } else {
      this.snackBarControlService.showMessage('As senhas não correspondem', true)
    }
  }

  private verifyPasswords(newPassword: string, confirmPassword: string): boolean {
    return newPassword === confirmPassword
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      actualPassword: [null, Validators.required],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/)]]
    })
  }

}
