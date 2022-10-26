import { CommonService } from './../../../../../shared/support/services/common.service';
import { FinValidatorsService } from './../../../../../../fin-sdk/validators/fin-validators.service';
import { UserService } from './../../../../services/user.service';
import { profileSettingFormControls } from './profileSettingsFormControls';
import { ResponseGetUserByIdDto } from 'src/app/shared/support/classes/responseGetUserByIdDto';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription, take } from 'rxjs';

import { ProfileService } from './profile.service';
import { SnackBarControlService } from '../../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { UserOutput } from 'src/app/shared/support/interfaces/user/userOutput.interface';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./styles/profile.component.css'],
  host: {
    class: 'h-100 w-100',
  },
})
export class ProfileComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public profileSettingFormControls = profileSettingFormControls;
  public smallScreen = false;
  private currentUserId = '';
  private currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  };
  private viewPortSizeObserver!:Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private snackBarControlService: SnackBarControlService,
    private userService: UserService,
    private finValidatorsService: FinValidatorsService,
    private commonService:CommonService
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
      next: data => {
        this.currentUserId = data['currentUserId'];
      },
    });

    this.populateForm();

    this.createForm();
  }
  public ngOnDestroy(): void {
    this.viewPortSizeObserver.unsubscribe();
  }
  public canSave() {
    return this.form.valid;
  }
  public saveChanges() {
    this.profileService.updateProfilePreferences(this.currentUser.id, this.form.value, (message: Message) => {
      this.snackBarControlService.showMessage(message.message, message.error);
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({});
    this.form.addControl(
      this.profileSettingFormControls.nameFormControl,
      this.formBuilder.control(null, [
        Validators.required,
        Validators.maxLength(25),
        this.finValidatorsService.trimValidator,
      ])
    );
    this.form.addControl(
      this.profileSettingFormControls.email,
      this.formBuilder.control(null, [Validators.email, Validators.required])
    );
  }

  private populateForm() {
    this.userService.getUserById(this.currentUserId, (data: ResponseGetUserByIdDto) => {
      this.currentUser = data.user;
      this.form.setValue({
        email: data.user.email,
        name: data.user.name,
      });
    });
  }
}
