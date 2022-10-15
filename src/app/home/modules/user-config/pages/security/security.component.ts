import UserInput from '../../../../../shared/support/interfaces/user/userInput.interface';
import UserOutput from 'src/app/shared/support/interfaces/user/userOutput.interface';
import ResponseGetUserByIdDto from 'src/app/shared/support/classes/responseGetUserByIdDto';
import { UserService } from './../../../../services/user.service';
import { securitySettingsFormConstrols } from './securitySettingsFormConstrols';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from './security.service';
import { SnackBarControlService } from './../../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Message from 'src/app/shared/support/interfaces/message.interface';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  host: {
    class: 'h-100 w-100',
  },
})
export class SecurityComponent implements OnInit {
  private currentUserId = '';
  public form!: FormGroup;
  public showNewPassword = false;
  public showActualPassword = false;
  public showConfirmPassword = false;
  public currentUser!: UserOutput;
  public securitySettingsFormConstrols = securitySettingsFormConstrols;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBarControlService: SnackBarControlService,
    private securityService: SecurityService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: data => {
        this.currentUserId = data['currentUserId'];
      },
    });
    this.getUserById();
    this.initForm();
  }
  public canSave(): boolean {
    return this.form.valid;
  }

  public saveChanges(): void {
    const actualPassword = this.form.get('actualPassword')?.value;
    const newPassword = this.form.get('newPassword')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    if (this.verifyPasswords(newPassword, confirmPassword)) {
      const user: UserInput = {
        email: this.currentUser.email,
        name: this.currentUser.name,
        password: actualPassword,
        newPassword: newPassword
      };
      this.securityService.updateUserPassword(this.currentUserId, user, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
      });
      this.form.reset();
    } else {
      this.snackBarControlService.showMessage('As senhas não correspondem', true);
    }
  }

  private verifyPasswords(newPassword: string, confirmPassword: string): boolean {
    return newPassword === confirmPassword;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      [this.securitySettingsFormConstrols.actualPassword]: [null, Validators.required],
      [this.securitySettingsFormConstrols.newPassword]: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/),
        ],
      ],
      [this.securitySettingsFormConstrols.confirmPassword]: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%_=!¨()+ç?[])[0-9a-zA-Z$*&@#%_=!¨()+ç?[]{8,}$/),
        ],
      ],
    });
  }
  private getUserById(): void {
    this.userService.getUserById(this.currentUserId, (data:ResponseGetUserByIdDto) => {
      this.currentUser = data.user;
    });
  }
}
