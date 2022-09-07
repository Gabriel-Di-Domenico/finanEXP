import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs';

import  UserOutput  from '../../../../../shared/support/interfaces/userOutput.interface';

import { ProfileService } from '../../services/profile.service';
import { SnackBarControlService } from '../../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { UserCrudProxysService } from '../../../../../shared/proxys/userCrudProxys/user-crud-proxys.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  host: {
    class: "h-100 w-100"
  }
})
export class ProfileComponent implements OnInit {

  profilePreferences!: FormGroup
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
          this.currentUserId = data['currentUserId']
        }
      })
    this.userCrudProxysService.getUserByIdRequest(this.currentUserId)
      .pipe(
        take(1)
      ).subscribe({
        next: (user: UserOutput) => {
          this.currentUser = user
          this.profilePreferences.setValue(
            {
              email: user.email,
              name: user.name
            }
          )
        }
      })
    this.profilePreferences = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.email, Validators.required]]
    })
  }
  saveChanges() {
    this.profileService.updateProfilePreferences(this.currentUser.id, this.profilePreferences.value, (err?: HttpErrorResponse) => {
      if (!err) {
        this.snackBarControlService.showMessage(`Sucesso`, false)
      } else {
        this.snackBarControlService.showMessage(`Erro`, true)
      }
    })
  }

}
