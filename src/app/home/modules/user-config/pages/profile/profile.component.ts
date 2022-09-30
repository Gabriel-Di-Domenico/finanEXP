import  ResponseGetUserByIdDto  from 'src/app/shared/support/classes/responseGetUserByIdDto';
import  Message  from 'src/app/shared/support/interfaces/message.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { take } from 'rxjs';

import  UserOutput  from '../../../../../shared/support/interfaces/userOutput.interface';

import { ProfileService } from './profile.service';
import { SnackBarControlService } from '../../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { UserCrudProxysService } from '../../../../../shared/proxys/userCrudProxys/user-crud.proxys.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  host: {
    class: "h-100 w-100"
  }
})
export class ProfileComponent implements OnInit {

  form!: FormGroup
  currentUserId: string = ''
  currentUser: UserOutput = {
    id: '',
    name: '',
    email: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private snackBarControlService: SnackBarControlService,
    private userCrudProxysService: UserCrudProxysService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        take(1)
      )
      .subscribe({
        next: (data) => {
          this.currentUserId = data['currentUserId'].token
        }
      })
    this.userCrudProxysService.getUserByIdRequest(this.currentUserId)
      .pipe(
        take(1)
      ).subscribe({
        next: (data: ResponseGetUserByIdDto) => {
          this.currentUser = data.user
          this.form.setValue(
            {
              email: data.user.email,
              name: data.user.name
            }
          )
        }
      })
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.email, Validators.required]],
    })
  }
  canSave(){
    return this.form.valid
  }
  saveChanges() {
    this.profileService.updateProfilePreferences(this.currentUser.id, this.form.value, (message: Message) => {
      this.snackBarControlService.showMessage(message.message, message.error)
    })
  }

}
