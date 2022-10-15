import { Subscription } from 'rxjs';
import { UserHandlerService } from './user-handler.service';
import { Injectable, OnInit, OnDestroy, Inject } from '@angular/core';
import { UserOutput } from '../support/interfaces/user/userOutput.interface';
@Injectable({
  providedIn: 'root',
})
export class UserHandler implements OnInit, OnDestroy {
  handlerSubscription!: Subscription;

  currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  };
  constructor(private userHandlerService: UserHandlerService) {}
  protected ngOnInitFunction(): void {}
  protected ngOnDestroyFunction(): void {}
  protected afterListening(): void {}
  ngOnInit(): void {
    this.ngOnInitFunction();
    this.listenHandler();
  }
  ngOnDestroy(): void {
    this.ngOnDestroyFunction();
    this.destroyHandler();
  }
  private listenHandler(): void {
    this.handlerSubscription = this.userHandlerService.registerGetUser().subscribe({
      next: (user: UserOutput) => {
        this.currentUser = user;
        this.afterListening();
      },
    });
  }
  private destroyHandler(): void {
    this.handlerSubscription.unsubscribe();
  }
}
