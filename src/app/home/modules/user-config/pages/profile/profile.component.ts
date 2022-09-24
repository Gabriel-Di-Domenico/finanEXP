import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs';

import  UserOutput  from '../../../../../shared/support/interfaces/userOutput.interface';

import { ProfileService } from './profile.service';
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
          this.currentUserId = data['currentUserId']
        }
      })
    this.userCrudProxysService.getUserByIdRequest(this.currentUserId)
      .pipe(
        take(1)
      ).subscribe({
        next: (user: UserOutput) => {
          this.currentUser = user
          this.form.setValue(
            {
              email: user.email,
              name: user.name
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
    this.profileService.updateProfilePreferences(this.currentUser.id, this.form.value, (err?: HttpErrorResponse) => {
      if (!err) {
        this.snackBarControlService.showMessage(`Preferências salvas com sucesso`, false)
      } else {
        if(err.status === 401){
          this.snackBarControlService.showMessage("Sessão expirada", true)
        }else{
          this.snackBarControlService.showMessage(`Erro ao modificar preferências`, true)
        }
      }
    })
  }

}
