import { CommonService, SnackBarControlService } from 'finan-exp-sdk';

import { UserService } from './../../../../services/user.service';
import { securitySettingsFormConstrols } from './securitySettingsFormConstrols';
import { take, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from './security.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { BreakpointState } from '@angular/cdk/layout';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';
import { UserInput } from 'src/app/core/dtos/user/userInput';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./styles/security.component.css'],
  host: {
    class: 'h-100 w-100',
  },
})
export class SecurityComponent implements OnInit, OnDestroy {
  private currentUserId = '';
  public form!: FormGroup;
  public showNewPassword = false;
  public showActualPassword = false;
  public showConfirmPassword = false;
  public currentUser!: UserOutput;
  public smallScreen = false;
  public securitySettingsFormConstrols = securitySettingsFormConstrols;
  private viewPortSizeObserver!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBarControlService: SnackBarControlService,
    private securityService: SecurityService,
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.viewPortSizeObserver = this.commonService.startViewPortSizeObserver().subscribe((res: BreakpointState) => {
      if (res.matches) {
        this.smallScreen = true;
      } else {
        this.smallScreen = false;
      }
    });
  }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (data:any) => {
        this.currentUserId = data['currentUserId'];
      },
    });
    this.getUserById();
    this.initForm();
  }
  ngOnDestroy() {
    this.viewPortSizeObserver.unsubscribe();
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
        newPassword: newPassword,
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
    this.userService.getUserById(this.currentUserId, (data: ResponseDto<UserOutput>) => {
      this.currentUser = data.content;
    });
  }
}
